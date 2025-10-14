import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getToken } from "next-auth/jwt";
import { isDevCookies } from "@/config/api-endpoint";

export async function GET(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    // Auto-expire codes before returning
    await db.referral.updateMany({
      where: { expiresAt: { lt: new Date() }, status: "ACTIVE" },
      data: { status: "EXPIRED" },
    });

    const referrals = await db.referral.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ message: "Referral list", referrals }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch referrals" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    }

    const { code } = await req.json();

    if (!code) {
        return NextResponse.json({ message: 'Referral code is required' }, { status: 400 });
    }

    try {
        const referral = await db.referral.findUnique({
            where: { code: code.toUpperCase() },
        });

        if (!referral) {
            return NextResponse.json({ message: 'Invalid referral code' }, { status: 404 });
        }

        await db.referral.update({
            where:{
                code
            },
            data:{
                status: referral.status == "ACTIVE" ? "INACTIVE":"ACTIVE"
            }
        })

        return NextResponse.json({ message: 'Referral code updated' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to validate referral code' }, { status: 500 });
    }
}