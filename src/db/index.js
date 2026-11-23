import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
/*as it takes time to connect to the database, we can use async/await to handle the asynchronous nature of the connection process. This way, we can ensure that the server only starts listening for requests after a successful connection to the database has been established.*/
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        /* here we are using the mongoose.connect() method to connect to the MongoDB database. 
        The connection string is constructed using the MONGODB_URI environment variable and the DB_NAME constant. 
        The await keyword is used to wait for the connection to be established before proceeding. Process.env vaneko
    chai environment variable ho, jasle chai sensitive information haru store garna use huney ho.
         */

        console.log("Connected to MongoDB");

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with a failure code
        throw error;// rethrow the error to be handled by the caller if needed
    }
};


export default connectDB;/* here we are creating a function called connectDB, 
which connects to the MongoDB database using the mongoose.connect() method.
 The connection string is constructed using the MONGODB_URI environment variable 
 and the DB_NAME constant. If the connection is successful, a message is logged to the console. 
 If there is an error, it is logged to the console and the process exits with a failure code. 
 The function is exported as the default export of the module so that it can be used in other parts of the application. */