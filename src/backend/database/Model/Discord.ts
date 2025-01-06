import mongoose, {Model} from "mongoose"

interface IDiscord extends mongoose.Document {
    id: string,
    username: string,
    email: string,
    isRequesting: boolean,
    isAccepted: boolean,
    isDeclined: boolean,
}

const DiscordSchema = new mongoose.Schema<IDiscord>({
    id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    isRequesting: {type: Boolean, required: true, default: true},
    isAccepted: {type: Boolean, required: true, default: false},
    isDeclined: {type: Boolean, required: true, default: false},
}, {timestamps: true});

const Discord: Model<IDiscord> = mongoose.models.Discord || mongoose.model<IDiscord>("Discord", DiscordSchema);

export default Discord;