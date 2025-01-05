"use client"
import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {Discord, DiscordSchema} from "@/schemas/Discord";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useDiscord} from "@/contexts/DiscordContext";

const DiscordComponent: React.FC = () => {
    const {discordStat, sendJoinRequest, loading} = useDiscord();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<Discord>({
        resolver: zodResolver(DiscordSchema)
    });
    const {toast} = useToast()
    const onSubmit = async (data: Discord) => {
        console.log(data);
        try {
            console.log("Discord Stats", discordStat);
            if (discordStat.email === data.email && discordStat.isMember) {
                toast({
                    title: "Error",
                    description: "You are already a member of our Discord server!",
                    variant: "destructive",
                    className: "bg-red-500 text-white",
                    action: (
                        <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                     onClick={() => console.log("Undoing...")}>Close</ToastAction>
                    )
                })
                return;
            }
            if (discordStat.email === data.email && discordStat.isRequestSent) {
                toast({
                    title: "Error",
                    description: "You have already sent a request to join our Discord server!",
                    variant: "destructive",
                    className: "bg-red-500 text-white",
                    action: (
                        <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                     onClick={() => console.log("Undoing...")}>Close</ToastAction>
                    )
                })
                return;
            }
            await sendJoinRequest(data.email);
            toast({
                title: "Success",
                description: "You have successfully joined our Discord server!",
                variant: "default",
                className: "bg-gray-900 text-white border border-green-500",

                action: (
                    <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                 onClick={() => console.log("Undoing...")}>Close</ToastAction>
                )
            })

        } catch
            (e) {
            console.error(e);
            toast({
                title: "Error",
                description: "An error occurred while joining the Discord server. Please try again later.",
                variant: "destructive",
                className: "bg-red-500 text-white",
                action: (
                    <ToastAction className={"hover:text-gray-900 border border-green-500"} altText={"close"}
                                 onClick={() => console.log("Undoing...")}>Close</ToastAction>
                )
            })
        } finally {
            reset();
        }
    }
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
                <CardContent>
                    <form className={"flex flex-col"} onSubmit={handleSubmit(onSubmit)}>
                        <Label className={"text-lg"}>Discord Invite Link</Label>
                        <Input placeholder={"Enter your email address"}
                               className={"w-full mt-2 outline-none border-none focus:border-none focus:outline-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-transparent cursor text-sky-400 font-semibold placeholder:text-sky-400 placeholder:opacity-50 bg-gray-900"}
                               {...register("email", {required: "This field is required"})}/>
                        {errors.email && <span className={"text-red-500"}>{errors.email.message}</span>}
                        <Button
                            variant={"default"}
                            className={"bg-sky-400 text-white px-4 py-2 rounded-md mt-4 hover:bg-sky-500 transition-colors"}>
                            {loading ? "Joining..." : "Join Discord"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default DiscordComponent;