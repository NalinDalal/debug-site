import React from "react";
import {DiscordProvider} from "@/contexts/DiscordContext";


export const metadata = {
    title: 'College Community Platform',
    description: 'A platform for college students to connect, learn, and grow',
}

export default function DiscordLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <DiscordProvider>
            {children}
        </DiscordProvider>
    )
}

