import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const origin = req.headers.get("origin") ?? "https://koraplatform.co.uk";

  // Portal billing flow (existing subscriber managing billing)
  if (body.token && body.orgId) {
    const API = process.env.NEXT_PUBLIC_API_URL!;
    const meRes = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${body.token}` },
    });
    if (!meRes.ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = await meRes.json();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      metadata: { orgId: body.orgId, userId: user.id },
      subscription_data: { trial_period_days: 7, metadata: { orgId: body.orgId } },
      success_url: `${origin}/portal/billing?success=1`,
      cancel_url: `${origin}/portal/billing`,
    });
    return NextResponse.json({ url: session.url });
  }

  // New signup flow — create account on webhook after payment
  const { firstName, lastName, email, orgName, trial } = body;
  if (!firstName || !lastName || !email || !orgName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const API = process.env.NEXT_PUBLIC_API_URL!;
  const eligibility = await fetch(
    `${API}/auth/check-eligibility?email=${encodeURIComponent(email)}&orgName=${encodeURIComponent(orgName)}`
  ).then((r) => r.json()).catch(() => ({ emailTaken: false, orgTaken: false }));

  if (eligibility.emailTaken) {
    return NextResponse.json(
      { error: "An account with this email already exists. Please sign in." },
      { status: 409 }
    );
  }
  if (eligibility.orgTaken) {
    return NextResponse.json(
      { error: "An organisation with this name is already registered. Please contact us if you need help." },
      { status: 409 }
    );
  }

  const customer = await stripe.customers.create({
    email,
    name: `${firstName} ${lastName}`,
    metadata: { firstName, lastName, orgName },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    allow_promotion_codes: true,
    metadata: { firstName, lastName, email, orgName },
    subscription_data: {
      ...(trial ? { trial_period_days: 7 } : {}),
      metadata: { firstName, lastName, email, orgName },
    },
    success_url: `${origin}/start/success`,
    cancel_url: `${origin}/start`,
  });

  return NextResponse.json({ url: session.url });
}
