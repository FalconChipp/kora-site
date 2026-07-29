import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const API = process.env.NEXT_PUBLIC_API_URL!;
const PORTAL_URL = "https://koraplatform.co.uk/portal";
const COUPON_ID = "KORA_TRIAL_20";

function generatePassword(): string {
  return crypto.randomBytes(12).toString("base64url").slice(0, 16);
}

async function getOrCreateCoupon(): Promise<string> {
  try {
    await stripe.coupons.retrieve(COUPON_ID);
    return COUPON_ID;
  } catch {
    await stripe.coupons.create({
      id: COUPON_ID,
      percent_off: 20,
      duration: "once",
      name: "20% off your first month — welcome to KORA",
    });
    return COUPON_ID;
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const { firstName, lastName, email, orgName } = session.metadata ?? {};
  if (!firstName || !lastName || !email || !orgName) return;

  const tempPassword = generatePassword();

  const res = await fetch(`${API}/auth/checkout-complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      orgName,
      tempPassword,
      secret: process.env.CHECKOUT_SECRET,
    }),
  });

  if (!res.ok) {
    console.error("checkout-complete failed:", await res.json().catch(() => ({})));
  }
}

async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  // If the subscription already has a discount (e.g. early access code), don't apply
  // the trial discount on top — let the existing deal stand and just send a reminder.
  const hasExistingDiscount = subscription.discounts && subscription.discounts.length > 0;

  if (!hasExistingDiscount) {
    const couponId = await getOrCreateCoupon();
    await stripe.subscriptions.update(subscription.id, { discounts: [{ coupon: couponId }] });
  }

  const customer = await stripe.customers.retrieve(subscription.customer as string);
  if (customer.deleted || !customer.email) return;

  const firstName = (customer.metadata?.firstName ?? customer.name?.split(" ")[0]) ?? "there";

  const emailText = hasExistingDiscount
    ? [
        `Hi ${firstName},`,
        "",
        "Your 7-day KORA free trial ends in 3 days.",
        "",
        "Your early access discount is already applied to your account — no action needed.",
        "",
        `Sign in to your portal: ${PORTAL_URL}`,
        "",
        "If you have any questions before your trial ends, just reply to this email.",
        "",
        "The KORA team",
      ].join("\n")
    : [
        `Hi ${firstName},`,
        "",
        "Your 7-day KORA free trial ends in 3 days.",
        "",
        "As a thank you for trying KORA, we've automatically applied 20% off your first month.",
        "Your first payment will be £100 instead of £125 — no code needed, it's already on your account.",
        "",
        `Sign in to your portal: ${PORTAL_URL}`,
        "",
        "If you have any questions before your trial ends, just reply to this email.",
        "",
        "The KORA team",
      ].join("\n");

  await fetch(`${API}/early-signup/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: customer.email,
      subject: "Your KORA trial ends in 3 days",
      text: emailText,
      secret: process.env.CHECKOUT_SECRET,
    }),
  }).catch((err) => console.error("Trial email failed:", err));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutComplete(event.data.object as Stripe.Checkout.Session);
      break;
    case "customer.subscription.trial_will_end":
      await handleTrialWillEnd(event.data.object as Stripe.Subscription);
      break;
  }

  return NextResponse.json({ received: true });
}
