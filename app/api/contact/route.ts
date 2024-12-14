import { NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    await db.contact.create({ data: { name, email, message} });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
