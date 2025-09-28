import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from "next-auth/jwt";
import { isDevCookies } from '@/config/api-endpoint';

export async function POST(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req, secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { amount, referralCode } = await req.json();

    try {
        let totalAmount = parseFloat(amount);

        // Step 1: Check User's isGetReferral Status
        const user = await db.user.findUnique({
            where: { id: token.id as string }
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Step 2: Check Referral Code and Apply Discount
        if (referralCode) {
            if (user.isGetReferral) {
                return NextResponse.json({
                    message: 'Referral code already used by this user'
                }, { status: 400 });
            }

            const referral = await db.referral.findUnique({
                where: { code: referralCode.toUpperCase() },
            });

            if (!referral) {
                return NextResponse.json({ message: 'Invalid or inactive referral code' }, { status: 400 });
            }

            totalAmount -= referral.discount;
            if (totalAmount < 0) totalAmount = 0; // Prevent negative total

            // Update the user's isGetReferral status to true
            await db.user.update({
                where: { id: token.id as string },
                data: { isGetReferral: true },
            });
        }

        // // Step 3: Generate License Key and Save to DB
        // const licenseKey = `LIC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // const license = await db.license.create({
        //     data: {
        //         key: licenseKey,
        //         productName,
        //         buyerId: userId,
        //         expiryDate: new Date(expiryDate),
        //         message,
        //         links,
        //     },
        // });

        // await db.transaction.create({
        //     data: {
        //         licenseId: license.id,
        //         buyerId: userId,
        //         amount: totalAmount,
        //         currency,
        //     }
        // });

        // Step 4: Send Email to User
        // console.log(`Email sent to user: ${userId} with license key: ${licenseKey}`);

        // await transporter.sendMail({
        //     from: process.env.EMAIL_ID,
        //     to: user.email as string,
        //     subject: `Product License Key`,
        //     html: `<p><strong>Name:</strong> ${user.name || 'User'}</p>
        //            <p><strong>License Key:</strong> ${licenseKey}</p>
        //            <p><strong>Message:</strong> ${message || ''}</p>`,
        // });

        return NextResponse.json({ message: 'License purchased successfully', totalAmount }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while purchasing the license' }, { status: 500 });
    }
}

