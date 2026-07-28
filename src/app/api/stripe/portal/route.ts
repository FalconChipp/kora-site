import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const API = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const origin = req.headers.get("origin") ?? "https://koraplatform.co.uk";

  const meRes = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await meRes.json();

  // Find the Stripe customer by email
  const customers = await stripe.customers.list({ email: user.email, limit: 1 });
  if (!customers.data.length) {
    return NextResponse.json({ error: "No billing account found" }, { status: 404 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customers.data[0].id,
    return_url: `${origin}/portal/billing`,
  });

  return NextResponse.json({ url: session.url });
}
