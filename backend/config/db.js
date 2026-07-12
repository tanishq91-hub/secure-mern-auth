import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "MERN_Authentication",
        })

        console.log(
            `✅ MongoDB connected successfully: ${mongoose.connection.db.databaseName}`
        )
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error)
        process.exit(1)
    }
};

export default connectDB
