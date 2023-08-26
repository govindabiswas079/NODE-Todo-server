import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { DATABASE } from './database.js';
import { TodoRoute } from './Routes/TodoRoute.js';
import { UserRoute } from './Routes/UserRoute.js';

dotenv.config()

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ optionsSuccessStatus: 200 }));
app.use(cors({ optionsSuccessStatus: 200 }));

app.use('/api', UserRoute);
app.use('/api', TodoRoute);

app.get('/api', (req, res) => {
    res.status(201).json("Home GET Request");
});

app.use("*", (req, res) => {
    res.status(405).json({
        message: "Method Not Allowed",
    });
});

DATABASE()
    .then(() => {
        try {
            app.listen(process.env?.PORT, '127.0.0.1', () => {
                console.log(`Server connected to http://localhost:${process.env?.PORT}`)
            })
        } catch (error) {
            console.log('Cannot connect to the server', error)
        }
    })
    .catch((error) => {
        console.log("Invalid database connection...!", error);
    })