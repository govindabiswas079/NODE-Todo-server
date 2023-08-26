import mongoose from "mongoose";

export const UsersSchema = new mongoose.Schema({
    password: { type: String, required: [true, "Please provide a password"], unique: true, },
    email: { type: String, required: [true, "Please provide a unique email"], unique: true, },
    name: { type: String, required: [true, "Please provide name"], },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },

});

export default mongoose.model.Users || mongoose.model('Users', UsersSchema);