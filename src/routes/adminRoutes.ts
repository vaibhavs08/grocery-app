import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';

const router = Router();

router.post('/grocery-items', AdminController.addGroceryItem);
router.delete('/grocery-items/:id', AdminController.removeGroceryItem);
router.put('/grocery-items/:id', AdminController.updateGroceryItem);
router.patch('/grocery-items/:id/inventory', AdminController.manageInventory);

export default router;
