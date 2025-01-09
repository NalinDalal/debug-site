import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import connect from "@/backend/database/mongoose";
import Discord from "@/backend/database/Model/Discord";

export async function GET(req: NextRequest) {
    try {
        const res = await axios.get(`https://discord.com/api/oauth2/@me`, {
            headers: {
                Authorization: `Bearer ${req.headers.get(("Authorization"))}`
            }
        });
        if (res.status !== 200) return NextResponse.json({error: "Request not found!"}, {status: 404});
        console.log("Data", res.data);
        return NextResponse.json({message: "User Fetched successfully", data: res.data}, {status: 200});
    } catch (error: any) {
        console.log("error", error);
        return NextResponse.json({message: "An error occurred while fetching the users!", error}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const code = req.nextUrl.searchParams.get("code");
        if (!code) return NextResponse.json({error: "Code not found!"}, {status: 404});
        const res = await axios.post(`https://discord.com/api/oauth2/token`, {
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: "client_credentials",
                code,
                redirect_uri: `http://localhost:3000/discord`,
                scope: "identify email guilds.join",
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const userExists = Discord.findOne({id: res.data.id});
        if (!userExists) {
            await Discord.create({
                id: res.data.user.id,
                username: res.data.user.username,
                email: res.data.user.email,
                isRequestSent: true,
            });
        }


        if (res.status !== 200) return NextResponse.json({error: "Request not found!"}, {status: 404});

        return NextResponse.json({message: "User Fetched successfully", data: res.data}, {status: 200});

    } catch (error: any) {
        console.log("error", error);
        return NextResponse.json({message: "An error occurred while fetching the users!", error}, {status: 500});
    }
}