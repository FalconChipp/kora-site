import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { first, last, email, org, reason, message } = body;

  if (!first || !last || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const text = [
    `From: ${first} ${last} <${email}>`,
    org ? `Organisation: ${org}` : null,
    reason ? `Reason: ${reason}` : null,
    "",
    message || "(no message)",
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `KORA enquiry from ${first} ${last}${org ? ` – ${org}` : ""}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
