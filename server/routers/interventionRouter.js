import express from 'express';
import Intervention from '../controllers/intervention';
import 'babel-polyfill';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/interventions', Auth.verifyToken, Intervention.create);
router.get('/interventions', Auth.verifyToken, Intervention.getAll);
router.get('/interventions/:id', Auth.verifyToken, Intervention.getOne);
router.patch('/interventions/:id/location', Auth.verifyToken, Intervention.updateLocation);
router.patch('/interventions/:id/comment', Auth.verifyToken, Intervention.updateComment);

export default router;
