import express from 'express';
import redFlag from '../controllers/redFlag';
import 'babel-polyfill';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/red-flags', Auth.verifyToken, redFlag.create);
router.get('/red-flags', Auth.verifyToken, redFlag.getAll);

export default router;
