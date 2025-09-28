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

    const { userId, licenseKey, emailTempId} = await req.json();

    try {
        const getUserData = await db.user.findUnique({
            where:{ id : userId as string}
        })
        const getEmailConetent = await db.featureSection.findUnique({
            where:{id : emailTempId}
        })
        const emailHtml = `
        ${getEmailConetent?.htmlContent}

        <hr />

        <p><strong>License Key:</strong> ${licenseKey}</p>
        `

        await transporter.sendMail({
            from: process.env.EMAIL_ID,
            to: getUserData?.email as string,
            subject: `Product License Key`,
            html: emailHtml,
        });

        return NextResponse.json({ message: 'Mail Send.'}, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while sending mail' }, { status: 500 });
    }
}