import mongoose from "mongoose";

const connect = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log("Already connected.");
            return;
        } else {
            await mongoose.connect(process.env.MONGODB_URI as string,);
            console.log("Connected to MongoDB.");
        }
    } catch (error: any) {
        console.log("Error connecting to MongoDB: ", error.message);
    }
};


export default connect;