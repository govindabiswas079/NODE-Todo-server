import express from 'express';
import { SignUp, SignIn, GetUsers, GetUser } from '../Controllers/UserController.js';
import { DuplicateEmail } from '../utils/DuplicateEmail.js';
import { UserExit } from '../utils/UserExit.js';
import { UserIdExit } from '../utils/UserIdExit.js';

const UserRoute = express.Router({ automatic405: false });

UserRoute.post('/user/register', DuplicateEmail, SignUp, (req, res) => res.end())
UserRoute.post('/user/login', UserExit, SignIn, (req, res) => res.end())
UserRoute.get('/user', GetUsers, (req, res) => res.end())
UserRoute.get('/user/:_id', UserIdExit, GetUser, (req, res) => res.end())

export { UserRoute };