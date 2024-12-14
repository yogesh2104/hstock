import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from "next-auth/jwt";
import { isDevCookies } from '@/config/api-endpoint';
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


export async function POST(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName:isDevCookies});

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{status:401});
    }

    const { userId, productName, expiryDate, message, links, amount, currency } = await req.json();

    try {
        const licenseKey = `LIC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
       
        const getUserData = await db.user.findUnique({
            where:{ id : token.id as string}
        })

        const license = await db.license.create({
            data: {
              key: licenseKey,
              productName,
              buyerId: userId,
              expiryDate: new Date(expiryDate),
              message,
              links,
            },
        });

        await db.transaction.create({
            data: {
                licenseId: license.id,
                buyerId: userId,
                amount,
                currency,
            }
        });

        console.log(`Email sent to user: ${userId} with license key: ${licenseKey}`);

        await transporter.sendMail({
            from: process.env.EMAIL_ID,
            to: getUserData?.email as string,
            subject: `Product License Key`,
            // text: message,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Message:</strong> ${licenseKey}</p>`,
        });

        return NextResponse.json({ message: 'License purchased successfully'}, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while purchasing the license' }, { status: 500 });
    }
}

