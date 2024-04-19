import { GroceryItem } from '../entities/GroceryItem';
import { AppDataSource } from '../data-source';

export class GroceryService {
    static async addGroceryItem(name: string, price: number, inventory: number): Promise<GroceryItem> {
        const groceryItemRepository = AppDataSource.getRepository(GroceryItem);
        const newItem = groceryItemRepository.create({ name, price, inventory });
        await groceryItemRepository.save(newItem);
        return newItem;
    }

    static async removeGroceryItem(itemId: number): Promise<void> {
        const groceryItemRepository = AppDataSource.getRepository(GroceryItem);
        await groceryItemRepository.delete({
            id: itemId
        });
    }

    static async updateGroceryItem(itemId: number, newName?: string, newPrice?: number,): Promise<GroceryItem | undefined> {
        const groceryItemRepository = AppDataSource.getRepository(GroceryItem);
        const item = await groceryItemRepository.findOne({ where: { id: itemId } });
    
        if (item) {
            if (newName !== undefined) {
                item.name = newName;
            }
            if (newPrice !== undefined) {
                item.price = newPrice;
            }
            
            await groceryItemRepository.save(item);
            return item;
        }
        
        return undefined;
    }
    

    static async manageInventory(itemId: number, newInventory: number): Promise<GroceryItem | undefined> {
        const groceryItemRepository = AppDataSource.getRepository(GroceryItem);
        const item = await groceryItemRepository.findOne({where:{id:itemId}});
        if (item) {
            item.inventory = newInventory;
            await groceryItemRepository.save(item);
            return item;
        }
        return undefined;
    }

    static async getGroceryItems(): Promise<GroceryItem[]> {
        const groceryItemRepository = AppDataSource.getRepository(GroceryItem);
        return groceryItemRepository.find();
    }
}
