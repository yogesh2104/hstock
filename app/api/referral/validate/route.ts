// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/db';
// import { getToken } from 'next-auth/jwt';
// import { isDevCookies } from '@/config/api-endpoint';

// export async function POST(req: NextRequest) {
//     const secret = process.env.AUTH_SECRET;
//     const token = await getToken({ req , secret, cookieName: isDevCookies });

//     if (!token) {
//         return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
//     }

//     const { code } = await req.json();

//     if (!code) {
//         return NextResponse.json({ message: 'Referral code is required' }, { status: 400 });
//     }

//     try {
//         const referral = await db.referral.findUnique({
//             where: { code: code.toUpperCase() },
//         });

//         if (!referral || !referral.isActive) {
//             return NextResponse.json({ message: 'Invalid or inactive referral code' }, { status: 404 });
//         }

//         return NextResponse.json({ message: 'Referral code valid', discount: referral.discount }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Failed to validate referral code' }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getToken } from "next-auth/jwt";
import { isDevCookies } from "@/config/api-endpoint";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!code) return NextResponse.json({ message: "Referral code is required" }, { status: 400 });

  try {
    const referral = await db.referral.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!referral) {
      return NextResponse.json({ message: "Invalid referral code" }, { status: 404 });
    }

    // Auto-expire check
    if (referral.expiresAt && referral.expiresAt < new Date()) {
      await db.referral.update({
        where: { id: referral.id },
        data: { status: "EXPIRED" },
      });
      return NextResponse.json({ message: "Referral code has expired" }, { status: 410 });
    }

    if (referral.status !== "ACTIVE") {
      return NextResponse.json({ message: referral.status == "EXPIRED" ? "Referral code is expired":"Referral code is inactive" }, { status: 403 });
    }

    return NextResponse.json(
      { message: "Referral code valid", discount: referral.discount },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to validate referral code" }, { status: 500 });
  }
}
