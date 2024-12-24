import {
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    Table,
    ForeignKey,
    BelongsTo,
    HasMany,
    
  } from "sequelize-typescript";
  import { Folder } from "./folder.model";
import { SharedItem } from "./sharedItems.model";

  
  @Table({
    tableName: "notes",
    timestamps: true,
  })
  export class Note extends Model<Note> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;
  
    @Column({ type: DataType.TEXT, allowNull: false })
    content: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    createdBy: string;

    @HasMany(()=>SharedItem)
    sharedItem : SharedItem[]
  

    @Column({ type: DataType.TEXT, allowNull: false })
    createdByName: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isFavorite?: boolean;

    @Column({type:DataType.BOOLEAN , defaultValue : false })
    isActive ?: boolean

    @Column({type:DataType.BOOLEAN , defaultValue : false })
    isDelete ?: boolean
  
  
    @ForeignKey(() => Folder) 
    @Column({ type: DataType.UUID })
    folderId?: string;
  
    @BelongsTo(() => Folder)
    folder: Folder;
  }
  