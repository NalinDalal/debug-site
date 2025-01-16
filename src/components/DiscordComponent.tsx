"use client"
import React, {useEffect} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import useDiscord from "@/store/Discord";
import {useRouter, useSearchParams} from "next/navigation";


const DiscordComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("code");
    const {user, sendJoinRequest, verifyUser, logout} = useDiscord();
    const handleSignIn = async () => {
        try {
            await sendJoinRequest();

        } catch (e) {
            console.log("Error while signing in with Discord");
            console.error(e);
        }


    };
    useEffect(() => {
        console.log("query", query, !query);
        if (query) {
            verifyUser(query).then(() => {
                router.replace("/discord");
            });
        }
    }, [query])

    async function handleSignOut() {
        await logout();
    }

    if (!query) {
        return (

            <main
                className={"flex flex-col gap-10 flex-wrap justify-center items-center w-full h-screen bg-gray-900 text-white "}>
                <h1 className={"text-5xl"}>Join Our Discussion Room</h1>
                <Card className={"w-1/2"}>
                    <CardHeader>
                        <CardTitle className={"text-sky-400 text-4xl"}>Join Now!</CardTitle>
                        <CardDescription className={"text-lg"}>
                            Join our Discord server to discuss with other developers and get help from the community.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={"flex justify-center items-start flex-wrap flex-col"}>
                        <Button
                            variant={"default"}
                            onClick={handleSignIn}
                            className={"bg-sky-400 text-white px-4 py-2 rounded-md mt-4 hover:bg-sky-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"}
                            disabled={!!user}>
                            {
                                user ? user.isMember ? "Go to the Server" : "Join request sent" : "Join with Discord"
                            }

                        </Button>
                        {!user ?
                            <span
                                className={"text-xs mt-2 text-gray-400"}>You need to sign in with Discord to join our
                    server.</span> :
                            <>
                        <span
                            className={"text-xs mt-2 text-gray-400"}>Your join request has been successfully sent!
                        </span>
                                <div className={"flex justify-center items-center -space-x-2"}>
                                    <span className={"text-xs mt-2 text-gray-400"}>Switch account?</span><Button
                                    variant={"link"}
                                    onClick={handleSignOut}
                                    className={"text-sky-400 text-xs mt-2"}>
                                    logout
                                </Button>
                                </div>
                            </>
                        }
                    </CardContent>
                </Card>
            </main>
        )
    } else {
        // add a loader
        return (
            <main
                className={"flex flex-col gap-10 flex-wrap justify-center items-center w-full h-screen bg-gray-900 text-white "}>
                <h1 className={"text-5xl"}>Join Our Discussion Room</h1>
                <Card className={"w-1/2"}>
                    <CardHeader>
                        <CardTitle className={"text-sky-400 text-4xl"}>Join Now!</CardTitle>
                        <CardDescription className={"text-lg"}>
                            Join our Discord server to discuss with other developers and get help from the community.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={"flex justify-center items-start flex-wrap flex-col"}>
                        <span className={"text-xs mt-2 text-gray-400"}>Joining the server...</span>
                    </CardContent>
                </Card>
            </main>
        );
    }
}

export default DiscordComponent;