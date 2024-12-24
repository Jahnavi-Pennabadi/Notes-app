
import { Column, DataType,Model, Default, HasMany, PrimaryKey, Table } from "sequelize-typescript";
import { SharedItem } from "./sharedItems.model";


@Table({
    tableName : 'Users',
    timestamps : true
})
export class Users extends Model<Users>{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    id: string;

    @HasMany(() =>SharedItem)
    SharedItem : SharedItem[]

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

}
