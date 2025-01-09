import {NextRequest, NextResponse} from "next/server";
import connect from "@/backend/database/mongoose";
import Discord from "@/backend/database/Model/Discord";

export async function POST(req: NextRequest) {
    try {
        const {userId, username, accessToken} = await req.json();
        await connect();
        const userExists = await Discord.findOne({id: userId});
        if (!userExists) {
            await Discord.create({
                id: userId,
                username: username,
                accessToken: accessToken,
                isRequestSent: true,
            });
        }
        await Discord.findOneAndUpdate({id: userId}, {
            accessToken: accessToken,
            isRequestSent: true,
        });

        return NextResponse.json({
            message: "User saved successfully",
            data: {userId, username, accessToken}
        }, {status: 200});

    } catch (error: any) {
        console.log("error", error);
        return NextResponse.json({message: "An error occurred while saving the user!", error}, {status: 500});
    }
}