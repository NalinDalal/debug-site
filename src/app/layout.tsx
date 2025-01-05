import './globals.css'
import {Inter} from 'next/font/google'
import {AuthProvider} from '@/contexts/AuthContext'
import React from "react";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'College Community Platform',
    description: 'A platform for college students to connect, learn, and grow',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            {children}
            <Toaster/>
        </AuthProvider>
        </body>
        </html>
    )
}

