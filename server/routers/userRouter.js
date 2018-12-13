import express from 'express';
import User from '../controllers/user';
import 'babel-polyfill';
import Validator from '../middleware/validator';

const router = express.Router();

router.post('/auth/signup', Validator.userRecords, Validator.isValidEmail, User.signup);
router.post('/auth/login', Validator.isValidEmail, User.login);

export default router;
