// backend/database/dbConnection.js
import mongoose from "mongoose";

const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"RESTAURANT"
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((error)=>{
        console.error("Database connection failed:", error);
    });
};
export { dbConnection };

