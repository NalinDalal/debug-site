import {getServerSession, NextAuthOptions} from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import axios from "axios";

const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async session({session, token}) {
            if (session.user) {
                console.log("session", session);
                (session.user as { id: string }).id = token.sub as string;
                axios.post("http://localhost:3000/api/auth/send", {
                    email: session.user.email,
                    userId: session.user.name,
                    username: session.user.name
                }).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
            }
            return session;
        },
    },
}

const getSession = () => getServerSession(authOptions);

export {authOptions, getSession}
