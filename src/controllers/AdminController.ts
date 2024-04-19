import { Request, Response } from 'express';
import { GroceryService } from '../services/GroceryService';

export class AdminController {
    static async addGroceryItem(req: Request, res: Response) {
        const { name, price, inventory } = req.body;
        try {
            const newItem = await GroceryService.addGroceryItem(name, price, inventory);
            res.status(201).json(newItem);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async viewGroceryItems(req: Request, res: Response) {
        try {
            const groceryItems = await GroceryService.getGroceryItems();
            res.json(groceryItems);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    

    static async removeGroceryItem(req: Request, res: Response) {
        const itemId = req.params.itemId; // Assuming itemId is passed in the request parameters
        try {
            // Implementation to remove item by ID
            const removedItem = await GroceryService.removeGroceryItem(parseInt(itemId));
            res.status(204).send(); // No content on successful deletion
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }    

    static async updateGroceryItem(req: Request, res: Response) {
        const itemId = req.params.itemId; // Assuming itemId is passed in the request parameters
        const { name, price } = req.body;
        try {
            // Implementation to update item by ID
            const updatedItem = await GroceryService.updateGroceryItem(parseInt(itemId), name, price);
            res.status(200).send(); // Assuming success status code
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    

    static async manageInventory(req: Request, res: Response) {
        const itemId = req.params.itemId; // Assuming itemId is passed in the request parameters
        const { inventory } = req.body;
        try {
            // Implementation to manage inventory by ID
            const updatedItem = await GroceryService.manageInventory(parseInt(itemId), inventory);
            res.status(200).send(); // Assuming success status code
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    
}
