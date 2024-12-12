import { db } from "@/db";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import cryptoRandomString from "crypto-random-string";

export const generatePasswordResetToken = async (email: string) => {

  const token = cryptoRandomString({length: 64, type: 'alphanumeric'});
  
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};