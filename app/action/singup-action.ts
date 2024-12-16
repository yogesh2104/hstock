"use server";

import { hash } from "bcryptjs";
import { db } from "@/db";

export const signUp = async (formData: FormData) => {
    try {
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const companyName = formData.get("companyName") as string;
        const phoneNumber = formData.get("mobileNumber") as string;
        const address1 = formData.get("address1") as string;
        const address2 = formData.get("address2") as string;
        const country = formData.get("country") as string;
        const state = formData.get("state") as string;
        const city = formData.get("city") as string;
        const pinCode = formData.get("pinCode") as string;

        
        // Validate input
        if (!email || !password) {
            return { error: "All Fields Required!" };
        }

        // Check if the user already exists
        let existingUser = await db.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return {
                error: "Email already exists. try Login or Forget Password."
            };
        }

        // Hash password
        const hashPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name:fullName,
                email,
                password: hashPassword,
                phoneNumber:parseInt(phoneNumber),
                companyName:companyName,
                isGetReferral:false,
                address:address1,
                address2:address2,
                country,
                state,
                city,
                pincode:parseInt(pinCode)
            }
        });

        return {
            success: true,
            data: {
                email: newUser.email,
                name: newUser.name,
                image: newUser.image,
            }
        };

    } catch (error) {
        console.error(error);
        return { error: "Something went wrong! Please try again." };
    }
};
