"use client";

import React, {useState} from "react";
import {Header} from "@/components/Header";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Suggestions} from "@/components/Suggestions";
import {Suggestion} from "../../../types/suggestion";
import Link from "next/link";
import useAuthStore from "@/store/Auth";

// Mock suggestions data
const mockSuggestions: Suggestion[] = [
    {
        id: "1",
        title: "Introduction to Machine Learning",
        description:
            "Learn the basics of machine learning algorithms and their applications.",
        type: "course",
        link: "/courses/intro-to-ml",
    },
    {
        id: "2",
        title: "AWS Certified Solutions Architect",
        description:
            "Prepare for the AWS Certified Solutions Architect - Associate certification.",
        type: "certification",
        link: "/certifications/aws-solutions-architect",
    },
    {
        id: "3",
        title: "Data Structures and Algorithms",
        description:
            "Comprehensive notes on fundamental data structures and algorithms.",
        type: "note",
        link: "/notes/data-structures-algorithms",
    },
    {
        id: "4",
        title: "Tech Career Fair",
        description: "Annual tech career fair with top companies in the industry.",
        type: "event",
        link: "/events/tech-career-fair",
    },
];

export default function ProfilePage() {
    const {user, isAdmin} = useAuthStore(); // Only destructure once
    const [profileData, setProfileData] = useState({
        dob: "",
        certifications: "",
        interests: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProfileData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement profile update logic
        console.log("Updating profile:", profileData);
    };

    // Handle case where the user is not logged in or is not an admin
    if (!user || isAdmin === undefined || isAdmin === null) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-white bg-gray-900">
                <h2 className="mb-4 text-3xl font-bold">Access Restricted</h2>
                <p className="mb-6 text-lg text-center text-gray-400">
                    You need to log in to view your profile.
                </p>
                <Link href="/login" passHref>
                    <Button>Log In</Button>
                </Link>
            </div>
        );
    }

    // Render profile page for admins
    return (
        <>
            <Header/>
            <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="py-6 px-4 sm:px-0">
                    <h1 className="mb-4 text-3xl font-bold">Profile</h1>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>
                                {user.firstName} {user.lastName}
                            </CardTitle>
                            <CardDescription>
                                {isAdmin ? "Administrator" : "Student"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4 mb-4">
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" value={user.email} disabled/>
                                    </div>
                                    <div>
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input
                                            id="dob"
                                            name="dob"
                                            type="date"
                                            value={profileData.dob}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="certifications">
                                            Certifications (comma-separated)
                                        </Label>
                                        <Input
                                            id="certifications"
                                            name="certifications"
                                            value={profileData.certifications}
                                            onChange={handleInputChange}
                                            placeholder="e.g. AWS Certified, Google Cloud Professional"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="interests">
                                            Interests (comma-separated)
                                        </Label>
                                        <Input
                                            id="interests"
                                            name="interests"
                                            value={profileData.interests}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Machine Learning, Web Development, Data Science"
                                        />
                                    </div>
                                </div>
                                <Button type="submit">Update Profile</Button>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <p>Joined: {new Date(user.joinedDate).toLocaleDateString()}</p>
                            {isAdmin && (
                                <p className="ml-4 font-semibold text-blue-600">
                                    Admin privileges active
                                </p>
                            )}
                        </CardFooter>
                    </Card>

                    <h2 className="mb-4 text-2xl font-bold">Suggested for You</h2>
                    <Suggestions suggestions={mockSuggestions}/>
                </div>
            </main>
        </>
    );
}
