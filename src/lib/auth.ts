import {getServerSession, NextAuthOptions} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import connect from "@/backend/database/mongoose";
import Discord from "@/backend/database/Model/Discord";

if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET || !process.env.NEXTAUTH_URL) {
    throw new Error("Missing required environment variables: DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, or NEXTAUTH_URL");
}

const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "identify email guilds.join",
                },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        error: "/auth/error",
        signIn: "/discord",
    },
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async jwt({token, account}) {
            // Add the access token to the JWT if available
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            // Ensure database connection and handle user data
            try {
                await connect();

                const existingDiscordUser = await Discord.findOne({id: token.sub});
                if (!existingDiscordUser) {
                    // If user does not exist in the database, create a new record
                    const newUser = new Discord({
                        id: token.sub,
                        email: token.email,
                        username: token.name,
                        accessToken: account?.access_token,
                    });
                    await newUser.save();
                    console.log("New Discord user saved:", newUser);
                } else {
                    // If user already exists, update the access token
                    existingDiscordUser.accessToken = account?.access_token;
                    existingDiscordUser.isRequestSent = true;
                    await existingDiscordUser.save();
                    console.log("Discord user updated:", existingDiscordUser);
                }

            } catch (error) {
                console.error("Error in jwt callback:", error);
            }

            return token;
        },

        async session({token, session}) {
            if (token) {
                // Pass user ID and access token to the session object
                (session.user as { id?: string }).id = token.sub as string;
                (session.user as { accessToken?: string }).accessToken = token.accessToken as string;
            }

            return session;
        },
    },
};

const getSession = () => getServerSession(authOptions);

export {authOptions, getSession};
