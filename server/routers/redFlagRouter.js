import express from 'express';
import Redflag from '../controllers/redFlag';
import 'babel-polyfill';
import Auth from '../middleware/auth';
import Validator from '../middleware/validator';

const router = express.Router();

router.post('/red-flags', Validator.create, Auth.verifyToken, Redflag.create);
router.get('/red-flags', Auth.verifyToken, Redflag.getAll);
router.get('/red-flags/:id', Validator.getOne, Auth.verifyToken, Redflag.getOne);
router.patch('/red-flags/:id/location', Validator.getOne, Validator.updateLocation, Auth.verifyToken, Redflag.updateLocation);
router.patch('/red-flags/:id/comment', Validator.getOne, Validator.updateComment, Auth.verifyToken, Redflag.updateComment);
router.delete('/red-flags/:id', Validator.getOne, Auth.verifyToken, Redflag.delete);

export default router;