import UsersModel from '../Modals/UserModal.js'

export const DuplicateEmail = async (req, res, next) => {
    const { email } = req?.body;

    const oldEmail = await UsersModel.findOne({ email });
    if (oldEmail) return res.status(400).json({ message: "Email already exists" });
    next()
}