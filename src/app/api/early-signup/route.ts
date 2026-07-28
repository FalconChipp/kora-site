import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const COUPON_ID = "KORA_EARLY_ADOPTER";
const PORTAL_URL = "https://koraplatform.co.uk";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

function generateCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return "KORA-EARLY-" + Array.from(crypto.randomBytes(6))
    .map((b) => chars[b % chars.length])
    .join("");
}

async function getOrCreateCoupon(): Promise<string> {
  try {
    await stripe.coupons.retrieve(COUPON_ID);
    return COUPON_ID;
  } catch {
    await stripe.coupons.create({
      id: COUPON_ID,
      percent_off: 25,
      duration: "repeating",
      duration_in_months: 3,
      name: "Early adopter — 25% off for 3 months",
    });
    return COUPON_ID;
  }
}

export async function POST(req: NextRequest) {
  const { email, firstName } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const couponId = await getOrCreateCoupon();
  const code = generateCode();

  // Create a single-use promotion code in Stripe
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (stripe.promotionCodes.create as any)({
    coupon: couponId,
    code,
    max_redemptions: 1,
    metadata: { email, firstName: firstName ?? "" },
  });

  const name = firstName ? `, ${firstName}` : "";

  // Email the code to the signup
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Your early access discount for KORA",
    text: [
      `Hi${name},`,
      "",
      "Thanks for signing up for early access to KORA.",
      "",
      "As one of our first users, you get 25% off for your first 3 months.",
      "",
      `Your discount code: ${code}`,
      "",
      "Enter this code at checkout when KORA launches. It's personal to you and can only be used once.",
      "",
      `In the meantime, you can explore what's coming at ${PORTAL_URL}/features`,
      "",
      "We'll be in touch when we're ready to launch.",
      "",
      "The KORA team",
    ].join("\n"),
  });

  // Notify admin
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO,
    subject: `New early signup: ${email}`,
    text: `Email: ${email}\nName: ${firstName ?? "—"}\nCode: ${code}`,
  });

  return NextResponse.json({ code });
}
