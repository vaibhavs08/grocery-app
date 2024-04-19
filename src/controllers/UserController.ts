import { Request, Response } from 'express';
import { GroceryService } from '../services/GroceryService';
import { BookingService } from '../services/BookingService';

export class UserController {
    static async getGroceryItems(req: Request, res: Response) {
        try {
            const groceryItems = await GroceryService.getGroceryItems();
            res.json(groceryItems);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async bookGroceryItems(req: Request, res: Response) {
        const itemsToBook = req.body.items; // Assuming items to book are passed in the request body
        try {
            // Implement logic to book items
            const bookingDetails = await BookingService.bookGroceryItems(itemsToBook);
            res.status(200).json({ message: "Items booked successfully." });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    
}
