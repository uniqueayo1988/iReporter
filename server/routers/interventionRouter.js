import express from 'express';
import Intervention from '../controllers/intervention';
import 'babel-polyfill';

const router = express.Router();

router.post('/interventions', Intervention.create);

export default router;
