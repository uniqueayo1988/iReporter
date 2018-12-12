import express from 'express';
import Redflag from '../controllers/redFlag';
import 'babel-polyfill';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/red-flags', Auth.verifyToken, Redflag.create);
router.get('/red-flags', Auth.verifyToken, Redflag.getAll);
router.get('/red-flags/:id', Auth.verifyToken, Redflag.getOne);
router.patch('/red-flags/:id/location', Auth.verifyToken, Redflag.updateLocation);
router.patch('/red-flags/:id/comment', Auth.verifyToken, Redflag.updateComment);
router.delete('/red-flags/:id', Auth.verifyToken, Redflag.delete);

export default router;
