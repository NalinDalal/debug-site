import mongoose from "mongoose"

const connect = async () => {

    try {
        if (mongoose.connections[0].readyState) return;
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Error connecting MongoDB", e);
        process.exit(1);
    }

}

export default connect;