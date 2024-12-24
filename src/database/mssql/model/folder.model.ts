
import { Model, Column, DataType, Default, PrimaryKey, Table, HasMany } from "sequelize-typescript";
import { Note } from "./notes.model"; 

@Table({
    tableName: "folders",
    timestamps: true,
})
export class Folder extends Model<Folder> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false ,validate :{notEmpty : true}})
    name: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    createdBy: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    createdByName: string;

    @Column({type:DataType.BOOLEAN , defaultValue : false })
    isActive ?: boolean

    @Column({type:DataType.BOOLEAN , defaultValue : false })
    isDelete ?: boolean
  
    @HasMany(() => Note) 
    notes: Note[];
}
