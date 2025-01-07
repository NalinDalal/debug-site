import {NextRequest, NextResponse} from "next/server";
import connect from "@/backend/database/mongoose";
import Discord from "@/backend/database/Model/Discord";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {email, userId, username} = await req.json();
        if (!email || !userId || !username) return NextResponse.json({error: "Missing Parameters!"}, {status: 400});/* check if the request already exists */
        const discord = await Discord.findOne({id: userId, email, username});
        if (discord) return NextResponse.json({error: "Request already exists!"}, {status: 400});
        // create a new request

        const newUsr
            = await Discord.create({
            id: userId,
            email,
            username,
        });
        return NextResponse.json({message: "Request sent!", newUsr}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: "An error occurred while sending the request!", error}, {status: 500});
    }
}

export async function GET() {
    try {
        await connect();
        const discord = await Discord.find();
        if (!discord) return NextResponse.json({error: "Request not found!"}, {status: 404});
        return NextResponse.json(discord, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: "An error occurred while fetching the request!", error}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connect();
        const {userId} = await req.json();
        if (!userId) return NextResponse.json({error: "Missing Parameters!"}, {status: 400});
        const discord = await Discord.findOne({id: userId});
        if (!discord) return NextResponse.json({error: "Request not found!"}, {status: 404});
        await Discord.updateOne({id: userId}, {
            isAccepted: true,
            isRequesting: false,
            isDeclined: false,
            isMember: true
        });
        return NextResponse.json({message: "Request accepted!"}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: "An error occurred while accepting the request!", error}, {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connect();
        const {userId} = await req.json();
        if (!userId) return NextResponse.json({error: "Missing Parameters!"}, {status: 400});
        const discord = await Discord.findOne({id: userId});
        if (!discord) return NextResponse.json({error: "Request not found!"}, {status: 404});
        await Discord.updateOne({id: userId}, {
            isAccepted: false,
            isRequesting: false,
            isDeclined: true,
            isMember: false
        });
        return NextResponse.json({message: "Request declined!"}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: "An error occurred while declining the request!", error}, {status: 500});
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connect();
        const {userId} = await req.json();
        if (!userId) return NextResponse.json({error: "Missing Parameters!"}, {status: 400});
        const discord = await Discord.findOne({id: userId});
        if (!discord) return NextResponse.json({error: "Request not found!"}, {status: 404});
        await Discord.updateOne({id: userId}, {
            isAccepted: false,
            isRequesting: true,
            isDeclined: false,
            isMember: false
        });
        return NextResponse.json({message: "Request updated!"}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: "An error occurred while updating the request!", error}, {status: 500});
    }
}