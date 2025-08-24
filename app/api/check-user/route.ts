// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/db';

// export async function GET(req: NextRequest) {
//     const { email } = await req.json();

//     try {
//         await db.user.findUnique({ where: { email } });

//         return NextResponse.json({ message: "User is active" }, { status: 200});
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: 'User is not active.',data:[] }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ active: false, error: "Email required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ active: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ active: user.active });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ active: false, error: "Server error" }, { status: 500 });
  }
}
