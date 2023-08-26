import UsersModel from '../Modals/UserModal.js'

export const UserExit = async (req, res, next) => {
    const { email } = req?.body;

    const oldEmail = await UsersModel.findOne({ email });
    if (oldEmail) {
        next()
    } else {
        return res.status(400).json({ message: "User not exists" })
    };
}