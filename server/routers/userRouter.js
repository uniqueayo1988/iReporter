import express from 'express';
import User from '../controllers/User';
import 'babel-polyfill';

const router = express.Router();

router.post('/auth/signup', User.create);

export default router;