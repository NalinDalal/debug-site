import {NextResponse} from "next/server";

export async function GET() {
    const DISCORD_API_URL = "https://discord.com/api/v10";
    const guildId = process.env.DISCORD_SERVER_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;
    console.log("tokens: ", guildId, botToken);
    try {
        const response = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/roles`, {
            method: "GET",
            headers: {
                Authorization: `Bot ${botToken}`
            },
        });
        if (!response.ok) {
            console.log(`Failed to fetch roles from Discord API. Status:`, response);
            return NextResponse.json({error: `Failed to fetch roles from Discord AP`}, {status: 400});
        }
        const roles = await response.json();
        return NextResponse.json({roles, success: true}, {status: 200});
    } catch (error) {
        console.error("Failed to fetch roles from Discord API", error);
        return NextResponse.json({error: "Failed to fetch roles from Discord API"}, {status: 500});
    }
}