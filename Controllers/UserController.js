import * as dotenv from 'dotenv';
import UsersModel from '../Modals/UserModal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config()

export const SignIn = async (req, res, next) => {
    const { email, password } = req?.body;

    try {
        await UsersModel.findOne({ email: email })
            .then(user => {
                bcrypt.compare(password, user?.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error: "Incorrect Password" });
                        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "24hr" });
                        return res.status(200).send({ ...user?._doc, token: token });
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error });
            });
    } catch (error) {
        return res.status(400).send({ error });
    }
}
export const SignUp = async (req, res, next) => {
    const { name, email, password } = req?.body;

    try {
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            await UsersModel.create({
                name,
                email,
                password: hashedPassword,
            })
                .then(result => res.status(201).send({ message: "User Register Successfully" }))
                .catch(error => res.status(500).send({ error }));
        } catch (error) {
            return res.status(404).send({ error });
        }
    } catch (error) {
        return res.status(400).send({ error });
    }
}
export const GetUsers = async (req, res, next) => {
    const { currentPage, pageSize, } = req.query;

    try {
        const LIMIT = pageSize;
        const startIndex = (Number(currentPage) - 1) * LIMIT;
        const total = await UsersModel.countDocuments({});
        const data = await UsersModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: data, currentPage: !currentPage ? 1 : Number(currentPage), totalPage: !pageSize ? 1 : Math.ceil(total / LIMIT), numberOfData: total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const GetUser = async (req, res, next) => {
    const { _id } = req?.params;
    try {
        await UsersModel.findOne({ _id })
            .then((response) => {
                return res.status(201).send(response)
            })
            .catch(() => {
                return res.status(404).send({ error });
            })
    } catch (error) {
        return res.status(404).send({ error });
    }
}