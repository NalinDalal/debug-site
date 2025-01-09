import {NextRequest, NextResponse} from "next/server";
import connect from "@/backend/database/mongoose";
import Discord from "@/backend/database/Model/Discord";

export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        await connect();
        const id = (await params).id;
        const discord = await Discord.find({id});
        console.log("discord", discord);
        if (!(discord.length > 0)) return NextResponse.json({error: "Request not found!"}, {status: 404});
        return NextResponse.json({message: "User Fetched successfully", discord}, {status: 200});
    } catch (error: any) {
        console.log("error", error);
        return NextResponse.json({message: "An error occurred while fetching the request!", error}, {status: 500});
    }
}
