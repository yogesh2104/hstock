import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/db";
import { isDevCookies } from "@/config/api-endpoint";

export async function GET(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    let payments;

    if (token.role === "admin") {
      payments = await db.payment.findMany({
        include: { user: true, plan: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      payments = await db.payment.findMany({
        where: { userId: token.sub },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching purchases" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (token.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const { paymentId, status } = await req.json();

    if (!paymentId || !status) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const updatedPayment = await db.payment.update({
      where: { id: paymentId },
      data: { status },
      include: { user: true, plan: true },
    });

    return NextResponse.json(
      { message: "Payment status updated", payment: updatedPayment },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating payment" }, { status: 500 });
  }
}
