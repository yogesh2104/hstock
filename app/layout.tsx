import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hstock",
  description: "hStock - Fast Design, Perfect Results",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} font-sans antialiased`}>
          {children}
          <Toaster richColors/>
        </body>
      </html>
    </SessionProvider>
  );
}
