import mongoose from "mongoose";
import TodoModal from '../Modals/TodoModal.js'

export const TodoExit = async (req, res, next) => {
    const { _id } = req?.body && req?.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send({ message: 'Todo not exitt' });

        const ifExit = await TodoModal.findOne({ _id })
        if (ifExit) {
            next()
        } else {
            return res.status(400).json({ message: "Todo not exists" })
        };
    } catch (error) {
        return res.status(400).json({ message: "Todo not exists" })
    }
}
