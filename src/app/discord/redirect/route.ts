// when user is redirected to this page by an API call, this page calls the sendRequest function from the DiscordContext to send a request to the Discord API
// to join the Discord server and then redirects the user to the Discord server

import {getSession} from "@/lib/auth";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});
        return NextResponse.json({message: "User Fetched", user: session.user}, {status: 200})
    } catch
        (e: any) {
        console.error(e);
        return NextResponse.json({error: "An error occurred while fetching the user"}, {status: 500});
    }
}