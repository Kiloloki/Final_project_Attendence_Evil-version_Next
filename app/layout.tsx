import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

export const metadata: Metadata = {
    title: "CS392 Attendance App",
    description: "A attendance app that checks student's ip address and records their facial image",
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body
                className="antialiased min-h-screen bg-gradient-to-b from-red-50 to-red-100"
            >
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}