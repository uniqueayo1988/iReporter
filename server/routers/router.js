import express from 'express';
import Redflag from '../controllers/Red-flag';
import Validator from '../middleware/validator';
import ValidateUpdateLocation from '../middleware/ValidateUpdateLocation';
import ValidateUpdateComment from '../middleware/ValidateUpdateComment';

const router = express.Router();

router.post('/red-flags', Validator.create, Redflag.create);
router.get('/red-flags', Redflag.getAll);
router.get('/red-flags/:id', Validator.getOne, Redflag.getOne);
router.patch('/red-flags/:id/location', Validator.getOne, ValidateUpdateLocation.update, Redflag.update);
router.patch('/red-flags/:id/comment', Validator.getOne, ValidateUpdateComment.update, Redflag.update);
router.delete('/red-flags/:id', Validator.getOne, Redflag.delete);

export default router;
