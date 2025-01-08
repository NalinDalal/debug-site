import {NextResponse, NextRequest} from "next/server";

const DISCORD_API_URL = "https://discord.com/api/v10";
const guildId = process.env.DISCORD_SERVER_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

// get the users in the server

export async function GET() {
    const DISCORD_API_URL = "https://discord.com/api/v10";
    const guildId = process.env.DISCORD_SERVER_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    try {
        let allMembers = [];
        let after: string | null = null; // Ensure `after` is a string or null

        do {
            const url = new URL(`${DISCORD_API_URL}/guilds/${guildId}/members`);
            url.searchParams.append("limit", "1000");
            if (after) url.searchParams.append("after", after);

            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    Authorization: `Bot ${botToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error fetching members:", errorData);
                return NextResponse.json(
                    {error: "Failed to fetch users from Discord API", data: errorData},
                    {status: response.status}
                );
            }

            const members = await response.json();
            allMembers = allMembers.concat(members);

            // Update "after" to the last member's ID for pagination
            after = members.length > 0 ? members[members.length - 1].user.id : null;
        } while (after); // Continue until there are no more members

        return NextResponse.json({members: allMembers, success: true}, {status: 200});
    } catch (error: any) {
        console.error("Failed to fetch members from Discord API", error);
        return NextResponse.json(
            {error: "Failed to fetch members from Discord API", details: error?.message},
            {status: 500}
        );
    }
}

// get the roles of a user in the server

export async function POST(req: NextRequest) {
    try {
        const {userId} = await req.json();
        if (!userId) {
            return NextResponse.json({error: "Missing userId"}, {status: 400});
        }
        const res = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/members/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json()
        if (!res.ok) {
            console.error("Failed to fetch user roles", res);
            return NextResponse.json({error: "Failed to fetch user roles", data}, {status: 400});
        }
        return NextResponse.json({data, success: true}, {status: 200});
    } catch (error) {
        console.error("Failed to fetch user roles", error);
        return NextResponse.json({error: "Failed to fetch user roles"}, {status: 500});
    }
}

