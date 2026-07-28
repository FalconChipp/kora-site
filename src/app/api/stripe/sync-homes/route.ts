import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const API = process.env.NEXT_PUBLIC_API_URL!;
const PRODUCT_ID = process.env.STRIPE_PRODUCT_ID!;

async function getOrCreateAddonPrice(): Promise<string> {
  const prices = await stripe.prices.list({ product: PRODUCT_ID, active: true, limit: 100 });
  const existing = prices.data.find(
    (p) => p.unit_amount === 2500 && p.currency === "gbp" && p.recurring?.interval === "month"
  );
  if (existing) return existing.id;

  const created = await stripe.prices.create({
    product: PRODUCT_ID,
    unit_amount: 2500,
    currency: "gbp",
    recurring: { interval: "month" },
    nickname: "Additional home (£25/month)",
  });
  return created.id;
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Get user details from the API
  const meRes = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const me = await meRes.json();

  // Count current homes
  const homesRes = await fetch(`${API}/homes/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!homesRes.ok) return NextResponse.json({ error: "Could not fetch homes" }, { status: 500 });
  const homes = await homesRes.json();
  const homeCount = Array.isArray(homes) ? homes.length : 0;

  // Find Stripe customer by email
  const customers = await stripe.customers.list({ email: me.email, limit: 1 });
  if (!customers.data.length) {
    // No Stripe customer yet (e.g. still on trial with no billing set up)
    return NextResponse.json({ synced: false, reason: "no_customer" });
  }
  const customer = customers.data[0];

  // Get active or trialing subscription
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    status: "active",
    limit: 1,
  });
  const trialSubs = await stripe.subscriptions.list({
    customer: customer.id,
    status: "trialing",
    limit: 1,
  });
  const subscription = subscriptions.data[0] ?? trialSubs.data[0];
  if (!subscription) {
    return NextResponse.json({ synced: false, reason: "no_subscription" });
  }

  const basePriceId = process.env.STRIPE_PRICE_ID!;
  const addonPriceId = await getOrCreateAddonPrice();
  const additionalHomes = Math.max(0, homeCount - 1);

  // Find existing items in the subscription
  const baseItem = subscription.items.data.find((i) => i.price.id === basePriceId);
  const addonItem = subscription.items.data.find((i) => i.price.id === addonPriceId);

  const items: Stripe.SubscriptionUpdateParams.Item[] = [];

  if (!baseItem) {
    items.push({ price: basePriceId, quantity: 1 });
  }

  if (additionalHomes === 0) {
    if (addonItem) {
      items.push({ id: addonItem.id, deleted: true });
    }
  } else if (addonItem) {
    if (addonItem.quantity !== additionalHomes) {
      items.push({ id: addonItem.id, quantity: additionalHomes });
    }
  } else {
    items.push({ price: addonPriceId, quantity: additionalHomes });
  }

  if (items.length > 0) {
    await stripe.subscriptions.update(subscription.id, {
      items,
      proration_behavior: "create_prorations",
    });
  }

  return NextResponse.json({ synced: true, homeCount, additionalHomes });
}
