"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Header} from "@/components/Header";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/Auth";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, loading} = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.back();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <Header/>
            <main className="flex flex-col justify-center items-center p-24 min-h-screen bg-gray-100">
                {/* Login Card */}
                <Card className="shadow-md w-[350px]">
                    {/* Card Header */}
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Login</CardTitle>
                        <CardDescription className="text-gray-500">
                            Enter your email and password to log in.
                        </CardDescription>
                    </CardHeader>

                    {/* Card Content */}
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </form>
                    </CardContent>

                    {/* Card Footer */}
                    <CardFooter className="flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            className="py-2 w-full text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                        >
                            {loading ? "Loading..." : "Login"}
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
}
