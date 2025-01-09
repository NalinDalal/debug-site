import mongoose, {Model} from "mongoose"

export interface IDiscord extends mongoose.Document {
    id: string,
    username: string,
    email: string,
    isRequestSent: boolean,
    isAccepted: boolean,
    isDeclined: boolean,
    isMember: boolean,
    accessToken?: string
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
    },
    accessToken: {
        type: String,
        default: null
    }
}, {timestamps: true});

const Discord: Model<IDiscord> = mongoose?.models?.Discords || mongoose.model<IDiscord>("Discords", DiscordSchema);

export default Discord;