import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/provider/theme-provider";
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
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} font-sans antialiased`}>
          <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
            {children}
            </ThemeProvider>
          <Toaster/>
        </body>
      </html>
    </SessionProvider>
  );
}
