import express from 'express';
import Intervention from '../controllers/intervention';
import 'babel-polyfill';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/interventions', Auth.verifyToken, Intervention.create);
router.get('/interventions', Auth.verifyToken, Intervention.getAll);
router.get('/interventions/:id', Auth.verifyToken, Intervention.getOne);

export default router;
