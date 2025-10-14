import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getToken } from "next-auth/jwt";
import { isDevCookies } from "@/config/api-endpoint";

export async function POST(req: NextRequest) {
  const { code, discount, expiresAt, minPrice  } = await req.json();
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (token.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  if (!code || !discount) {
    return NextResponse.json({ message: "Code and discount are required" }, { status: 400 });
  }

  const existing = await db.referral.findUnique({ where: { code: code.toUpperCase() } });
  if (existing) return NextResponse.json({ message: "This code already exists" }, { status: 409 });

  try {
    const referral = await db.referral.create({
      data: {
        code: code.toUpperCase(),
        discount: parseFloat(discount),
        minPrice: minPrice ? parseFloat(minPrice) : 0,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json(
      { message: "Referral created successfully", referral },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create referral code" }, { status: 500 });
  }
}
