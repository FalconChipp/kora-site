import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const API = process.env.NEXT_PUBLIC_API_URL!;
const PORTAL_URL = "https://koraplatform.co.uk/portal";
const COUPON_ID = "KORA_TRIAL_20";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

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

  const registerRes = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: tempPassword, firstName, lastName }),
  });

  if (!registerRes.ok) {
    console.error("Register failed:", await registerRes.json().catch(() => ({})));
    return;
  }

  const loginRes = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: tempPassword }),
  });
  if (!loginRes.ok) { console.error("Login after register failed"); return; }
  const { accessToken } = await loginRes.json();

  await fetch(`${API}/organisations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ name: orgName }),
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Welcome to KORA — your account is ready",
    text: [
      `Hi ${firstName},`,
      "",
      `Your KORA account has been created for ${orgName}. Your 7-day free trial starts now.`,
      "",
      `Sign in at: ${PORTAL_URL}`,
      `Email: ${email}`,
      `Temporary password: ${tempPassword}`,
      "",
      "Please change your password after signing in.",
      "",
      "If you have any questions, reply to this email or contact hello@sixbyfive.com.",
      "",
      "The KORA team",
    ].join("\n"),
  });
}

async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  const couponId = await getOrCreateCoupon();

  // Apply 20% discount to the subscription's first real charge
  await stripe.subscriptions.update(subscription.id, { coupon: couponId });

  // Get customer email to send the notification
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  if (customer.deleted || !customer.email) return;

  const firstName = (customer.metadata?.firstName ?? customer.name?.split(" ")[0]) ?? "there";

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: customer.email,
    subject: "Your KORA trial ends in 3 days — here's 20% off",
    text: [
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
    ].join("\n"),
  });
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
