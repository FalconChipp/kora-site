import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const API = process.env.NEXT_PUBLIC_API_URL!;
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

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customer = await stripe.customers.retrieve(invoice.customer as string);
  if (customer.deleted || !customer.email) return;

  const firstName = (customer.metadata?.firstName ?? customer.name?.split(" ")[0]) ?? "there";
  const amountDue = invoice.amount_due
    ? new Intl.NumberFormat("en-GB", { style: "currency", currency: invoice.currency.toUpperCase() }).format(invoice.amount_due / 100)
    : "your subscription payment";

  const billingUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://koraplatform.co.uk"}/portal/billing`;

  await fetch(`${API}/auth/send-payment-failed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: customer.email,
      firstName,
      amountDue,
      billingUrl,
      secret: process.env.CHECKOUT_SECRET,
    }),
  }).catch((err) => console.error("Payment failed email error:", err));
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  if (customer.deleted || !customer.email) return;

  const firstName = (customer.metadata?.firstName ?? customer.name?.split(" ")[0]) ?? "there";
  const accessUntil = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "the end of your billing period";

  await fetch(`${API}/auth/send-subscription-cancelled`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: customer.email,
      firstName,
      accessUntil,
      secret: process.env.CHECKOUT_SECRET,
    }),
  }).catch((err) => console.error("Subscription cancelled email error:", err));
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

  await fetch(`${API}/auth/send-trial-ending`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: customer.email,
      firstName,
      hasEarlyDiscount: hasExistingDiscount,
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
    case "invoice.payment_failed":
      await handlePaymentFailed(event.data.object as Stripe.Invoice);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionCancelled(event.data.object as Stripe.Subscription);
      break;
  }

  return NextResponse.json({ received: true });
}
