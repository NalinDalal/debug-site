import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import {Toaster} from "@/components/ui/toaster";
import Providers from "@/app/providers";
import {getSession} from "@/lib/auth";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'College Community Platform',
    description: 'A platform for college students to connect, learn, and grow',
}

export default async function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }
) {
    const session = await getSession();
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers session={session}>
            {children}
            <Toaster/>
        </Providers>
        </body>
        </html>
    )
}

