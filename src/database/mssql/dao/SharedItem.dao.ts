import { AbstractSharedItemDao } from "../abstract/SharedItem.abstract";
import { InjectModel } from "@nestjs/sequelize";
import { SharedItem } from "../model/sharedItems.model";

export class SharedItemDao implements AbstractSharedItemDao {
    constructor(
        @InjectModel(SharedItem)
        private readonly SharedItemModel: typeof SharedItem
    ) {}

    /**
     * Find all shared items for a given user.
     */
    findAllSharedItem = async (UserId: string): Promise<SharedItem[]> => {
        try {
            const sharedItems = await this.SharedItemModel.findAll({
                where: { sharedToId: UserId },
                order: [["createdAt", "ASC"]], // Optional: Order by created date
          
            });
            // console.log("Shared items found:", sharedItems);
            return sharedItems;
        } catch (error) {
            console.error("Error fetching shared items:", error);
            throw new Error("Failed to fetch shared items");
        }
    };
    
    findAllSharedNotes = async() =>{
        try {
            const sharedItems = await this.SharedItemModel.findAll({
                order: [["createdAt", "ASC"]], // Optional: Order by created date
          
            });
            console.log("Shared items found:", sharedItems);
            return sharedItems;
        } catch (error) {
            console.error("Error fetching shared items:", error);
            throw new Error("Failed to fetch shared items");
        }

    }
    /**
     * Find a shared item by its ID.
     */
    findSharedItem = async (SharedItemId: string): Promise<SharedItem | string> => {
        try {
            const sharedItem = await this.SharedItemModel.findByPk(SharedItemId);
            if (!sharedItem) {
                return "No shared item found";
            }
            return sharedItem;
        } catch (error) {
            console.error("Error fetching shared item:", error);
            throw new Error("Failed to fetch shared item");
        }
    };

    /**
     * Create shared items from the provided data.
     */
    postSharedItem = async (data: any): Promise<SharedItem[]> => {
        const { sharedToId, sharedToName, ItemId, ItemType, sharedById, sharedByName, permission } = data;

        // Prepare entries for bulk insertion
        const entries = sharedToId.map((id: string, index: number) => ({
            sharedToId: id,
            sharedToName: sharedToName[index],
            ItemId: ItemId,
            ItemType: ItemType,
            sharedById: sharedById,
            sharedByName: sharedByName,
            permission: permission,
        }));

        try {
            // console.log("Inserting shared items with entries:", entries);
            const response = await this.SharedItemModel.bulkCreate(entries);
            // console.log("Shared items inserted successfully");
            return response;
        } catch (error) {
            console.error("Error inserting shared items:", error.message);
            throw new Error("Failed to insert shared items");
        }
    };

    /**
     * Edit an existing shared item by its ID.
     */
    editSharedItem = async (Id: string, Data: any): Promise<string | [number, SharedItem[]]> => {
        try {
            const sharedItemExists = await this.SharedItemModel.findByPk(Id);
            if (!sharedItemExists) {
                return "No shared item found";
            }

            const response = await this.SharedItemModel.update(Data, {
                where: { id: Id },
            });
            console.log("Shared item updated successfully");
            return 'response';
        } catch (error) {
            console.error("Error updating shared item:", error);
            throw new Error("Failed to update shared item");
        }
    };

    /**
     * Partially update a shared item by its ID.
     */
    partialSharedItemUpdate = async (Id: string, partialData: any): Promise<SharedItem | string> => {
        try {
            const sharedItemExists = await this.SharedItemModel.findByPk(Id);
            if (!sharedItemExists) {
                return "No shared item found";
            }

            await this.SharedItemModel.update(partialData, {
                where: { id: Id },
            });

            const updatedSharedItem = await this.SharedItemModel.findByPk(Id);
            console.log("Shared item partially updated:", updatedSharedItem);
            return updatedSharedItem;
        } catch (error) {
            console.error("Error partially updating shared item:", error);
            throw new Error("Failed to partially update shared item");
        }
    };

    /**
     * Delete a shared item by its ID.
     */
    deleteSharedItem = async (Id: string): Promise<number> => {
        try {
            const response = await this.SharedItemModel.destroy({
                where: { id: Id },
            });
            console.log("Shared item deleted successfully");
            return response;
        } catch (error) {
            console.error("Error deleting shared item:", error);
            throw new Error("Failed to delete shared item");
        }
    };
}
