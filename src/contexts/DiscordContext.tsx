"use client";

import React, {createContext, useContext, useState, useEffect} from "react";
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import axios from "axios";

interface Disco {
    email: string | null;
    isRequestSent: boolean;
    isMember: boolean;
}

interface DiscordContextType {
    discordStat: Disco;
    discordStats: Disco[];
    loading: boolean;
    sendJoinRequest: (email: string, userId: string, username: string) => Promise<void>;
    updateDiscordStats: (data: Disco) => void;
    getDiscordStats: () => Promise<void>;

}

const DiscordContext = createContext<DiscordContextType | undefined>(undefined);

export const useDiscord = () => {
    const context = useContext(DiscordContext);
    if (context === undefined) {
        throw new Error("useDiscord must be used within an DiscordProvider");
    }
    return context;
};

export const DiscordProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                             children,
                                                                         }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [discordStat, setDiscordStat] = useState<Disco>({
        email: null,
        isMember: false,
        isRequestSent: false
    });
    const [discordStats, setDiscordStats] = useState<Disco[]>([{
        email: null,
        isMember: false,
        isRequestSent: false
    }]);

    useEffect(() => {
        // Check for saved discord data in localStorage
        const DiscordUser = localStorage.getItem("discord");
        const Discords = localStorage.getItem("discords");
        if (DiscordUser) {
            const discordStat = JSON.parse(DiscordUser);
            setDiscordStat({
                email: discordStat.email,
                isMember: discordStat.isMember,
                isRequestSent: discordStat.isRequestSent
            });
        }
        if (Discords) {
            const discords = JSON.parse(Discords);
            setDiscordStats(discords);
        }
    }, []);

    const sendJoinRequest = async (email: string, userId: string, username: string) => {
        setLoading(true);
        try {
            const req = await axios.post('/api/auth/send', {
                email: email,
                username: username,
                userId: userId
            })
            if (req.status !== 200) {
                throw new Error("An error occurred while sending the request to join the Discord server. Please try again later.")
            }

            setDiscordStat({
                email,
                isMember: false,
                isRequestSent: true
            });
            localStorage.setItem("discord", JSON.stringify({
                email,
                isMember: false,
                isRequestSent: true
            }));
            // update the discord stats in localstorage
            discordStats.push({
                email,
                isMember: false,
                isRequestSent: true
            })
            localStorage.setItem("discords", JSON.stringify(discordStats));
            // toast
            toast({
                title: "Success",
                description: "Discord server request sent successfully",
                variant: "default",
                className: "bg-gray-900 text-white border border-green-500",
                action: (
                    <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                 onClick={() => console.log("Undoing...")}>Close</ToastAction>
                )
            })
        } catch (e) {
            console.error(e);
            toast({
                title: "Error",
                description: "An error occurred while sending the request to join the Discord server. Please try again later.",
                variant: "destructive",
                className: "bg-red-500 text-white",
                action: (
                    <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                 onClick={() => console.log("Undoing...")}>Close</ToastAction>
                )
            })
        } finally {
            setLoading(false);
        }
    };

    const updateDiscordStats = async (data: Disco) => {
        try {
            setLoading(true);
            setDiscordStat({
                email: data.email,
                isMember: data.isMember,
                isRequestSent: data.isRequestSent
            });
            localStorage.setItem("discord", JSON.stringify({
                email: data.email,
                isMember: data.isMember,
                isRequestSent: data.isRequestSent
            }));

            // update the discord stats element in localstorage
            discordStats[discordStats.findIndex((stat) => stat.email === data.email)] = {
                email: data.email,
                isMember: data.isMember,
                isRequestSent: data.isRequestSent
            };

            localStorage.setItem("discords", JSON.stringify(discordStats));


        } catch (e) {
            console.error(e);
            toast({
                title: "Error",
                description: "An error occurred while updating the Discord server stats. Please try again later.",
                variant: "destructive",
                className: "bg-red-500 text-white",
                action: (
                    <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                 onClick={() => console.log("Undoing...")}>Close</ToastAction>
                )
            })
        } finally {
            setLoading(false);
            await getDiscordStats();
        }
    }

    const getDiscordStats = async () => {
        try {
            // Send a request to the backend to create a new user
            // await fetch("/api/discord", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(data)
            // });
            setDiscordStats(set => [...set, discordStat]);
            localStorage.setItem("discords", JSON.stringify(discordStats));
            toast({
                title: "Success",
                description: "Discord server stats fetched successfully",
                variant: "default",
                className: "bg-gray-900 text-white border border-green-500",
                action: (
                    <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                 onClick={() => console.log("Undoing...")}>Close</ToastAction>
                )
            })
        } catch (e) {
            console.error(e);
            toast({
                title: "Error",
                description: "An error occurred while fetching the Discord server stats. Please try again later.",
                variant: "destructive",
                className: "bg-red-500 text-white",
                action: (
                    <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                 onClick={() => console.log("Undoing...")}>Close</ToastAction>
                )
            })
        }

    }
    return (
        <DiscordContext.Provider
            value={{loading, discordStat, discordStats, sendJoinRequest, updateDiscordStats, getDiscordStats}}>
            {children}
        </DiscordContext.Provider>
    );

};
