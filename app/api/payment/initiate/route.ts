// import { NextRequest, NextResponse } from "next/server"
// import { getToken } from "next-auth/jwt"
// import { db } from "@/db"
// import { isDevCookies } from "@/config/api-endpoint"

// export async function POST(req: NextRequest) {
//   const secret = process.env.AUTH_SECRET
//   const token = await getToken({ req, secret, cookieName: isDevCookies })

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const { planId, transactionId, discount } = await req.json()

//     if (!planId || !transactionId) {
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
//     }

//     // get plan details
//     const plan = await db.plan.findUnique({ where: { id: planId } })
//     if (!plan) {
//       return NextResponse.json({ message: "Plan not found" }, { status: 404 })
//     }

//     const baseAmount = plan.price
//     const appliedDiscount = discount ? Number(discount) : 0
//     const finalAmount = Math.max(baseAmount - appliedDiscount, 0)

//     // create payment record
//     const payment = await db.payment.create({
//       data: {
//         userId: token.sub!,
//         planId,
//         amount: baseAmount,
//         discount: appliedDiscount,
//         finalAmount,
//         transactionId,
//         status: "PENDING",
//       },
//     })

//     return NextResponse.json(
//       { message: "Payment request submitted", data: payment },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error("Payment error:", error)
//     return NextResponse.json({ message: "Failed to submit payment" }, { status: 500 })
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getToken } from "next-auth/jwt";
import { isDevCookies } from "@/config/api-endpoint";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { planId, referralCode , transactionId } = await req.json();

  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // fetch plan
    const plan = await db.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      return NextResponse.json({ message: "Invalid plan" }, { status: 404 });
    }

    let appliedDiscount = 0;

    // 🔹 Referral Code Check
    if (referralCode) {
      const referral = await db.referral.findUnique({
        where: { code: referralCode.toUpperCase() },
      });

      if (!referral) {
        return NextResponse.json({ message: "Invalid referral code" }, { status: 404 });
      }

      // Expiry
      if (referral.expiresAt && referral.expiresAt < new Date()) {
        return NextResponse.json({ message: "Referral code expired" }, { status: 410 });
      }

      // Status
      if (referral.status !== "ACTIVE") {
        return NextResponse.json({ message: "Referral inactive" }, { status: 403 });
      }

      // Already used by this user?
      const alreadyUsed = await db.payment.findFirst({
        where: {
          userId: token.sub!,
          referralCode: referralCode.toUpperCase(),
        },
      });

      if (alreadyUsed) {
        return NextResponse.json(
          { message: "You already used this referral code" },
          { status: 409 }
        );
      }

      appliedDiscount = referral.discount;
    }

    // Calculate amounts
    const baseAmount = plan.price;
    const finalAmount = baseAmount - appliedDiscount;

    // Save payment
    const payment = await db.payment.create({
      data: {
        userId: token.sub!,
        planId,
        amount: baseAmount,
        discount: appliedDiscount,
        finalAmount,
        transactionId,
        referralCode: referralCode?.toUpperCase() || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { message: "Payment initiated", payment },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
