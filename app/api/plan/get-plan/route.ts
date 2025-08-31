import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from 'next-auth/jwt';
import { isDevCookies } from '@/config/api-endpoint';

export async function POST(req:NextRequest){
    // const secret = process.env.AUTH_SECRET;
    // const token = await getToken({ req , secret, cookieName: isDevCookies });

    // if (!token) {
    //     return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    // }
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
        }

        const planExists = await db.plan.findUnique({ where: { id } });

        if (!planExists) {
            return NextResponse.json({ message: "Plan not found" }, { status: 404 });
        }

        return NextResponse.json({ message : "Plan details", data: planExists} , { status : 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "Fail To Get Plan" , data : [] } , { status : 500 })
    }
}