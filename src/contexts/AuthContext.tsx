"use client";

import React, {createContext, useContext, useState, useEffect} from "react";
import {User} from "../../types/user";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                          children,
                                                                      }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Mock login logic
        console.log(password); // Log password or assign validation logic if needed

        // Replace with actual backend logic to validate user and retrieve role
        const mockUser: User = {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            email: email,
            role: email === "admin@example.com" ? "admin" : "user", // Explicit admin role based on email (you can replace this logic with actual backend logic)
            joinedDate: new Date().toISOString(),
        };

        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const isAdmin = user?.role === "admin"; // Check for admin role

    return (
        <AuthContext.Provider value={{user, login, logout, isAdmin}}>
            {children}
        </AuthContext.Provider>
    );
};
