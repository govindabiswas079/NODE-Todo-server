import * as dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config()

export const DATABASE = async () => {
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(process?.env?.COMPASS_URI);
    return db;
}