import express from 'express';
import Intervention from '../controllers/intervention';
import 'babel-polyfill';
import Auth from '../middleware/auth';
import Validator from '../middleware/validator';
import Upload from '../middleware/upload';

const router = express.Router();

router.post('/interventions', Upload.single('image'), Validator.create, Auth.verifyToken, Intervention.create);
router.get('/interventions', Auth.verifyToken, Intervention.getAll);
router.get('/interventions/users', Auth.verifyToken, Intervention.getAllUsers);
router.get('/interventions/:id', Validator.getOne, Auth.verifyToken, Intervention.getOne);
router.patch('/interventions/:id/location', Validator.getOne, Validator.updateLocation, Auth.verifyToken, Intervention.updateLocation);
router.patch('/interventions/:id/comment', Validator.getOne, Validator.updateComment, Auth.verifyToken, Intervention.updateComment);
router.patch('/interventions/:id/status', Validator.getOne, Auth.verifyToken, Intervention.updateStatus);
router.delete('/interventions/:id', Validator.getOne, Auth.verifyToken, Intervention.delete);

export default router;
