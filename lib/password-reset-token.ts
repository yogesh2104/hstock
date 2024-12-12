import { db } from "@/db"


export const getUserByEmail=async(email:string)=>{
    try {
        const userInfo = await db.user.findUnique({
            where:{
              email
            }
        })
        return userInfo
    } catch (error) {
        return null
    }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
