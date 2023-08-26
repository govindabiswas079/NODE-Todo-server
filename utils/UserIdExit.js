import mongoose from "mongoose";


export const UserIdExit = async (req, res, next) => {
    const { _id } = req?.body && req?.params;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            next();
        } else {
            return res.status(400).send({ message: 'User not exitt' });
        }
    } catch (error) {
        return res.status(404).send({ message: 'User not exit' });
    }
}