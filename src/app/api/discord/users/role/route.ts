import {NextRequest, NextResponse} from "next/server";

// get list of roles available in the server
const DISCORD_API_URL = "https://discord.com/api/v10";
const guildId = process.env.DISCORD_SERVER_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

export async function GET() {
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

// assign a role in the server
export async function POST(req: NextRequest) {

    try {
        const {name, color} = await req.json();
        if (!name || !color) {
            return NextResponse.json({error: "Missing name or color"}, {status: 400});
        }
        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/roles`, {
            method: "POST",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, color: Number(color)})
        });
        const data = await res.json()
        if (!res.ok) {
            console.error("Failed to assign role to server", res);
            return NextResponse.json({error: "Failed to assign role to server", data}, {status: 400});
        }
        return NextResponse.json({message: "Role added to server"}, {status: 200});
    } catch (error) {
        console.error("Failed to assign role to server", error);
        return NextResponse.json({error: "Failed to assign role to server"}, {status: 500});
    }
}

// delete a role in the server

export async function DELETE(req: NextRequest) {
    try {
        const {roleId} = await req.json();
        if (!roleId) {
            return NextResponse.json({error: "Missing roleId"}, {status: 400});
        }
        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/roles/${roleId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        });
        if (!res.ok) {
            console.error("Failed to delete role from server", res);
            return NextResponse.json({error: "Failed to delete role from server"}, {status: 400});
        }
        return NextResponse.json({message: "Role deleted from server"}, {status: 200});
    } catch (error) {
        console.error("Failed to delete role from server", error);
        return NextResponse.json({error: "Failed to delete role from server"}, {status: 500});
    }
}

// update a role in the server

export async function PUT(req: NextRequest) {
    try {
        const {roleId, name, color} = await req.json();
        if (!roleId || !name || !color) {
            return NextResponse.json({error: "Missing roleId, name or color"}, {status: 400});
        }
        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/roles/${roleId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, color: Number(color)})
        });
        if (!res.ok) {
            console.error("Failed to update role in server", res);
            return NextResponse.json({error: "Failed to update role in server"}, {status: 400});
        }
        return NextResponse.json({message: "Role updated in server"}, {status: 200});
    } catch (error) {
        console.error("Failed to update role in server", error);
        return NextResponse.json({error: "Failed to update role in server"}, {status: 500});
    }
}