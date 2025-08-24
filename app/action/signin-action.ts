
"use server";

import { db } from "@/db";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

const getUserByEmail=async(email:string)=>{
    try {
        const user = await db.user.findUnique({
            where: { email },
        });
        return user
    } catch (error) {
        return null
    }
}


export const login = async (formData: FormData) => {
    const rawData = {
        email:formData.get("email"),
        password:formData.get("password"),
        redirectTo:"/"
    }

    const existingUser = await getUserByEmail(formData.get("email") as string);
    
    if(!existingUser){
        return { error:"User Not Found" }
    }

    if (!existingUser?.active) {
        return { error: "Your account is inactive or deleted." };
    }

    const isPasswordValid = await bcrypt.compareSync(
        formData.get("password") as string,
        existingUser.password as string
    );

    if(!isPasswordValid){
        return { error:"Incorrect Password." } 
    }
    
    try {
        await signIn("credentials", rawData)
        
    } catch (error:any) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error:"Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error
    }

    revalidatePath("/")
};

export const logOut=async()=>{
    await signOut({redirectTo:"/"})
    revalidatePath("/")
}