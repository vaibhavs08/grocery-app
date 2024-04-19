import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.get('/grocery-items', UserController.getGroceryItems);
router.post('/grocery-items/book', UserController.bookGroceryItems);

export default router;
