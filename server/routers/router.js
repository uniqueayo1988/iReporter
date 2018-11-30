import express from 'express';
import Redflag from '../controllers/Red-flag';

const router = express.Router();

router.post('/red-flags', Redflag.create);
router.get('/red-flags', Redflag.getAll);
router.get('/red-flags/:id', Redflag.getOne);
router.patch('/red-flags/:id/location', Redflag.update);
router.patch('/red-flags/:id/comment', Redflag.update);
router.delete('/red-flags/:id', Redflag.delete);

export default router;