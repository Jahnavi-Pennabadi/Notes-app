import { Injectable } from "@nestjs/common";
import { Folder } from "../model/folder.model";
import { AbstractFolderDao } from "../abstract/folder.abstract";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class FolderDao implements AbstractFolderDao {
  constructor(
    @InjectModel(Folder)
    private readonly FolderModel: typeof Folder,
  ) {}

  async fetchAll(createdBy:any): Promise<Folder[] | Error> {
    try {
      const data = await this.FolderModel.findAll({ order: [['createdAt', 'ASC']],
        where : {
          createdBy : createdBy
        }
      });
      return data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async postData(data: Folder): Promise<Folder | Error> {
    try {
      const response = await this.FolderModel.create(data);
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async editData(folderId: string, data: Partial<Folder>):Promise<any> {
    try {
      const folder = await this.FolderModel.findByPk(folderId);
      if (!folder) {
        throw new Error("Folder not found");
      }

      await this.FolderModel.update(data, {
        where: { id: folderId },
      });
      
      return await this.FolderModel.findByPk(folderId)
    } catch (error) {
      console.error(error);
      return error instanceof Error ? error.message : "An error occurred";
    }
  }

  async updatePartialFolder(folderId: string, data: Partial<Folder>): Promise<any> {
    try {
        const noteExists = await this.FolderModel.findByPk(folderId);
        if (!noteExists) {
            return 'Note not found';
        }
        await this.FolderModel.update(data, { where: { id: folderId } });
        return await this.FolderModel.findByPk(folderId); 
    } catch (error) {
        throw new Error(`Error updating note: ${error.message}`);
    }
}


  async deleteData(folderId: string): Promise<any> {
    try {
      const response = await this.FolderModel.destroy({ where: { id: folderId } });
      if (response === 0) {
        throw new Error("Folder not found");
      }
      return response; 
    } catch (error) {
      console.error(error);
      return error instanceof Error ? error.message : "An error occurred";
    }
  }
}
