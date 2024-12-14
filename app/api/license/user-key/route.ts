import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from "next-auth/jwt";
import { isDevCookies } from '@/config/api-endpoint';

export async function POST(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName:isDevCookies});

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{status:401});
    }

    const { userId } = await req.json();

    try {
        const licenses = await db.license.findMany({
            where: { buyerId: userId },
        });

        return NextResponse.json({ message: 'License Key.', key: licenses }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while get license' }, { status: 500 });
    }
}

