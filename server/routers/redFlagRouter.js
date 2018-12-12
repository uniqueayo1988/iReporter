import express from 'express';
import redFlag from '../controllers/redFlag';
import 'babel-polyfill';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/interventions', Auth.verifyToken, redFlag.create);

export default router;
