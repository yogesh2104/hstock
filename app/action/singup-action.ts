"use server";

import { hash } from "bcryptjs";
import { db } from "@/db";

export const signUp = async (formData: FormData) => {
    try {
        const firstName = formData.get("fname") as string;
        const lastName = formData.get("lname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        
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
                error: "Email already exists"
            };
        }

        // Hash password
        const hashPassword = await hash(password, 10);

        // Create the new user
        const newUser = await db.user.create({
            data: {
                name:firstName+ " " +lastName,
                email,
                password: hashPassword,
                phoneNumber:parseInt(phoneNumber)
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
