import { 
    Model, 
    Column, 
    DataType, 
    Table, 
    PrimaryKey, 
    Default, 
    HasMany 
} from "sequelize-typescript";
import { SharedItem } from "./sharedItems.model";

@Table({
    tableName: 'Types',
    timestamps: true,
})
export class Types extends Model<Types> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
    })
    id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    type: string;

  // changed to `sharedItems` for consistency

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    isActive: boolean;
}
