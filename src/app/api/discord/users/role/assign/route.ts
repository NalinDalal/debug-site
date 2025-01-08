import {NextRequest, NextResponse} from "next/server";

const DISCORD_API_URL = "https://discord.com/api/v10";

// assign a role to a user in the server
export async function POST(req: NextRequest) {
    try {
        const {userId, roleId} = await req.json();
        const guildId = process.env.DISCORD_SERVER_ID;
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!userId || !roleId) {
            return NextResponse.json({error: "Missing userId or roleId"}, {status: 400});
        }

        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            console.error("Failed to assign role to user", res);
            return NextResponse.json({error: "Failed to assign role to user"}, {status: 400});
        }

        return NextResponse.json({message: "Role added to user"}, {status: 200});
    } catch (error) {
        console.error("Failed to assign role to user", error);
        return NextResponse.json({error: "Failed to assign role to user"}, {status: 500});
    }
}

// remove a role from a user in the server
export async function DELETE(req: NextRequest) {
    try {
        const {userId, roleId} = await req.json();
        const guildId = process.env.DISCORD_SERVER_ID;
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!userId || !roleId) {
            return NextResponse.json({error: "Missing userId or roleId"}, {status: 400});
        }

        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            console.error("Failed to remove role from user", res);
            return NextResponse.json({error: "Failed to remove role from user"}, {status: 400});
        }

        return NextResponse.json({message: "Role removed from user"}, {status: 200});
    } catch (error) {
        console.error("Failed to remove role from user", error);
        return NextResponse.json({error: "Failed to remove role from user"}, {status: 500});
    }
}

// get roles assigned to a user in the server
export async function GET(req: NextRequest) {
    try {
        const {userId} = await req.json();
        const guildId = process.env.DISCORD_SERVER_ID;
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!userId) {
            return NextResponse.json({error: "Missing userId"}, {status: 400});
        }

        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        });
        if (!res.ok) {
            console.error("Failed to fetch roles from user", res);
            return NextResponse.json({error: "Failed to fetch roles from user"}, {status: 400});
        }
        const data = await res.json();
        return NextResponse.json({roles: data.roles, success: true}, {status: 200});
    } catch (error) {
        console.error("Failed to fetch roles from user", error);
        return NextResponse.json({error: "Failed to fetch roles from user"}, {
            status: 500
        });

    }
}

// update a role assigned to a user in the server

export async function PUT(req: NextRequest) {
    try {
        const {userId, roleId, newRoleId} = await req.json();
        const guildId = process.env.DISCORD_SERVER_ID;
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!userId || !roleId || !newRoleId) {
            return NextResponse.json({error: "Missing userId, roleId or newRoleId"}, {status: 400});
        }

        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({roleId: newRoleId})
        })
        if (!res.ok) {
            console.error("Failed to update role for user", res);
            return NextResponse.json({error: "Failed to update role for user"}, {status: 400});
        }

        return NextResponse.json({message: "Role updated for user"}, {status: 200});
    } catch (error) {
        console.error("Failed to update role for user", error);
        return NextResponse.json({error: "Failed to update role for user"}, {status: 500});
    }
}

