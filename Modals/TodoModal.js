import mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
    title: { type: String, require: [true, "Please provide a title"] },
    description: { type: String, require: [true, "Please provide a description"] },
    userId: { type: String, require: [true, "Please provide user id"] },
    isComplete: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },

});

export default mongoose.model.Todos || mongoose.model('Todos', TodoSchema);