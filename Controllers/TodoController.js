import TodoModal from '../Modals/TodoModal.js';

export const TodoCcreat = async (req, res, next) => {
    const { title, description } = req?.body;

    try {

        await TodoModal.create({
            title,
            description,
            creator: req?.userId
        })
            .then(result => res.status(201).send({ message: "Todo Create Successfully" }))
            .catch(error => res.status(400).send({ error }));

    } catch (error) {
        return res.status(400).send({ error });
    }
}

export const TodosGet = async (req, res, next) => {
    const { currentPage, pageSize, } = req.query;
    console.log(req?.session)
    try {
        const LIMIT = pageSize;
        const startIndex = (Number(currentPage) - 1) * LIMIT;
        const total = await TodoModal.find({ creator: req?.userId });
        const data = await TodoModal.find({ creator: req?.userId }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: data, currentPage: !currentPage ? 1 : Number(currentPage), totalPage: !pageSize ? 1 : Math.ceil(total?.length / LIMIT), numberOfData: total?.length });
    } catch (error) {
        return res.status(400).send({ error });
    }
}

export const TodoGet = async (req, res, next) => {
    const { _id } = req?.params;

    try {
        await TodoModal.findOne({ _id })
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

export const TodoUpdate = async (req, res, next) => {
    const { _id } = req?.params;
    const { title, description, isComplete, completedAt } = req?.body;

    try {

        await TodoModal.updateOne({ _id }, { title, description, isComplete, completedAt, creator: req?.userId })
            .then((user) => {
                return res.status(200).send({ message: "Todo update successfully" });
            })
            .catch((error) => {
                return res.status(400).send({ message: "Todo update faield" });
            })
    } catch (error) {
        return res.status(404).send({ message: "Todo update faield" });
    }
}

export const TodoDelete = async (req, res, next) => {
    const { _id } = req?.params;

    try {
        TodoModal.findByIdAndRemove({ _id })
            .then(() => {
                return res.status(200).send({ message: "Todo deleted successfully." });
            })
            .catch(() => {
                return res.status(400).send({ error: "Todo deleted faield." });
            })
    } catch (error) {
        return res.status(404).send({ error: "Todo deleted faield." });
    }
}
