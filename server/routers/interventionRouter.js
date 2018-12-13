import express from 'express';
import Intervention from '../controllers/intervention';
import 'babel-polyfill';
import Auth from '../middleware/auth';
import Validator from '../middleware/validator';

const router = express.Router();

router.post('/interventions', Validator.create, Auth.verifyToken, Intervention.create);
router.get('/interventions', Auth.verifyToken, Intervention.getAll);
router.get('/interventions/:id', Validator.getOne, Auth.verifyToken, Intervention.getOne);
router.patch('/interventions/:id/location', Validator.getOne, Validator.updateLocation, Auth.verifyToken, Intervention.updateLocation);
router.patch('/interventions/:id/comment', Validator.getOne, Validator.updateComment, Auth.verifyToken, Intervention.updateComment);
router.delete('/interventions/:id', Validator.getOne, Auth.verifyToken, Intervention.delete);

export default router;
