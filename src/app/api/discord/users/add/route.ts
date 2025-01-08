import {NextResponse, NextRequest} from "next/server";

const DISCORD_API_URL = "https://discord.com/api/v10";

// add the user to the guild
export async function POST(req: NextRequest) {
    try {
        const {userId, access_token} = await req.json();
        const guildId = process.env.DISCORD_SERVER_ID;
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!userId || !access_token) {
            return NextResponse.json({error: "Missing userId"}, {status: 400});
        }

        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({access_token})
        })
        const data = await res.json()
        if (!res.ok) {
            console.error("Failed to add user to server", res);
            return NextResponse.json({error: "Failed to add user to server", data}, {status: 400});
        }

        return NextResponse.json({message: "User added to server"}, {status: 200});
    } catch (error) {
        console.error("Failed to add user to server", error);
        return NextResponse.json({error: "Failed to add user to server"}, {status: 500});
    }
}

// remove the user from the guild

export async function DELETE(req: NextRequest) {
    try {
        const {userId} = await req.json();
        const guildId = process.env.DISCORD_SERVER_ID;
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!userId) {
            return NextResponse.json({error: "Missing userId"}, {status: 400});
        }

        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        })
        if (!res.ok) {
            console.error("Failed to remove user from server", res);
            return NextResponse.json({error: "Failed to remove user from server"}, {status: 400});
        }

        return NextResponse.json({message: "User removed from server"}, {status: 200});
    } catch (error) {
        console.error("Failed to remove user from server", error);
        return NextResponse.json({error: "Failed to remove user from server"}, {status: 500});
    }
}


