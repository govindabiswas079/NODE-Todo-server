import express from 'express';
import {
    TodoCcreat,
    TodosGet,
    TodoGet,
    TodoUpdate,
    TodoDelete,
} from '../Controllers/TodoController.js';
import { TodoExit } from '../utils/TodoExit.js';
import { Auth } from '../middlewares/Auth.js'

const TodoRoute = express.Router({ automatic405: false });

TodoRoute.post('/todo', Auth, TodoCcreat, (req, res) => res.end())
TodoRoute.get('/todo', Auth, TodosGet, (req, res) => res.end())
TodoRoute.get('/todo/:_id', Auth, TodoExit, TodoGet, (req, res) => res.end())
TodoRoute.patch('/todo/:_id', Auth, TodoExit, TodoUpdate, (req, res) => res.end())
TodoRoute.delete('/todo/:_id', Auth, TodoExit, TodoDelete, (req, res) => res.end())

export { TodoRoute };