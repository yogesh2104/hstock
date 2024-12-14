import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from "next-auth/jwt";
import { auth } from '@/auth';
import { isDevCookies } from '@/config/api-endpoint';



export async function GET(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName:isDevCookies});

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{status:401});
    }

    try {
        const contactData = await db.contact.findMany();

        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                address:true,
                address2:true,
                city:true,
                companyName:true,
                state:true,
                phoneNumber:true,
                country:true,
                pincode:true,   
            }
        });

        return NextResponse.json({ message: "All user list", data: users, contact: contactData }, { status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to get all user.',data:[] }, { status: 500 });
    }
}

