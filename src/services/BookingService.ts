import { Booking } from '../entities/Booking';
import { GroceryItem } from '../entities/GroceryItem';
import { AppDataSource } from '../data-source';

export class BookingService {
    static async bookGroceryItems(itemsToBook: { itemId: number; quantity: number }[]): Promise<Booking> {
        // Create a new booking instance
        const bookingRepository = AppDataSource.getRepository(Booking);
        const newBooking = bookingRepository.create();
        
        // Calculate total price and update inventory
        let totalPrice = 0;
        for (const { itemId, quantity } of itemsToBook) {
            const groceryItemRepository = AppDataSource.getRepository(GroceryItem);
            const item = await groceryItemRepository.findOne({where: {id: itemId}});

            if (!item) {
                throw new Error(`Item with ID ${itemId} not found.`);
            }

            if (item.inventory < quantity) {
                throw new Error(`Not enough inventory for item ${item.name}.`);
            }

            item.inventory -= quantity;
            totalPrice += item.price * quantity;
            await groceryItemRepository.save(item);
        }

        newBooking.totalPrice = totalPrice;
        newBooking.items = itemsToBook.map(({ itemId, quantity }) => ({ itemId, quantity }));

        // Save the booking
        await bookingRepository.save(newBooking);
        
        return newBooking;
    }
}
