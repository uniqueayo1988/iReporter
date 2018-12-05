import express from 'express';
import Redflag from '../controllers/Red-flag';
import Validator from '../middleware/validator';

const router = express.Router();

router.post('/red-flags', Validator.create, Redflag.create);
router.get('/red-flags', Redflag.getAll);
router.get('/red-flags/:id', Validator.getOne, Redflag.getOne);
router.patch('/red-flags/:id/location', Validator.update, Redflag.update);
router.patch('/red-flags/:id/comment', Validator.update, Redflag.update);
router.delete('/red-flags/:id', Validator.delete, Redflag.delete);

export default router;
