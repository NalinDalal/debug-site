import {NextRequest} from "next/server";

const DISCORD_API_URL = "https://discord.com/api/v10";

export async function POST(req: NextRequest) {
    try {
        const {userId, roleId} = await req.json();
        const guildId = process.env.DISCORD_SERVER_ID;
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!userId || !roleId) {
            return new Response("Missing userId or roleId", {status: 400});
        }

        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            console.error("Failed to add role to user", res);
            return new Response("Failed to add role to user", {status: 400});
        }

        return new Response("Role added to user", {status: 200});
    } catch (error) {
        console.error("Failed to add role to user", error);
        return new Response("Failed to add role to user", {status: 500});
    }
}