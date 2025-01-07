import mongoose, {Model} from "mongoose"

interface IDiscord extends mongoose.Document {
    id: string,
    username: string,
    email: string,
    isRequestSent: boolean,
    isAccepted: boolean,
    isDeclined: boolean,
    isMember: boolean,
}

const DiscordSchema = new mongoose.Schema<IDiscord>({
    id: {
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    isRequestSent: {
        type: Boolean, default: true
    },
    isAccepted: {
        type: Boolean, default: false
    },
    isDeclined: {
        type: Boolean, default: false
    },
    isMember: {
        type: Boolean, default: false
    }
}, {timestamps: true});

const Discord: Model<IDiscord> = mongoose.models.Discord || mongoose.model<IDiscord>("Discord", DiscordSchema);

export default Discord;