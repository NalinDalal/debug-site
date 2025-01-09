// get the user by id
import connect from "@/backend/database/mongoose";
import Discord from "@/backend/database/Model/Discord";

const getDiscordUser = async (userId: string) => {
    try {
        await connect();
        const user = await Discord.findOne({id: userId});
        if (!user) return null;
        return user;
    } catch (e: any) {
        console.log("An error occurred while fetching the user", e);
        return null;
    }
};

export {getDiscordUser};