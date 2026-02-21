import mongoose from "mongoose"


export const ConnectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {dbName:"expense-tracker"});
        console.log("MongoDB Connect");
    } catch (error) {
        console.log("MongoDB Connecting Error : ", error);
        process.exit(1);
    }
}