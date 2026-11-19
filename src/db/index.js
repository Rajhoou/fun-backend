import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
/*as it takes time to connect to the database, we can use async/await to handle the asynchronous nature of the connection process. This way, we can ensure that the server only starts listening for requests after a successful connection to the database has been established.*/
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with a failure code
        throw error;
    }
};


export default connectDB;