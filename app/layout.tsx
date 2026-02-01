import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Niyas | Code that works (mostly)",
    description: "I turn coffee into bugs... and then fix them. Sometimes. | Full Stack Developer",
};

import CustomCursor from "@/components/ui/CustomCursor";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
