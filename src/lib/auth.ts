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
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async session({token, session}) {
            if (!token || !session.user) {
                return session; // Return the unchanged session
            }

            // Assign token's sub (user ID) to the session
            (session.user as { id: string }).id = token.sub as string;

            try {
                await connect();
                const newDiscord = await Discord.findOne({id: token.sub});
                if (newDiscord) {
                    return session;
                }
                // create a new request
                const newReq = new Discord({
                    id: token.sub,
                    email: session.user.email,
                    username: session.user.name,
                });
                await newReq.save();
                console.log("New Discord request created:", newReq);
            } catch (error) {
                console.error("Error during session callback:", error);
                return session; // Explicitly return null on error
            }

            return session; // Explicitly return the modified session
        },
    },
};

const getSession = () => getServerSession(authOptions);

export {authOptions, getSession};
