import { 
    Model, 
    Column, 
    DataType, 
    Table, 
    PrimaryKey, 
    Default, 
    ForeignKey, 
    BelongsTo 
} from "sequelize-typescript";
import { Users } from "./users.model"; 
import { Note } from "./notes.model";
import { Types } from "./types.model";

@Table({
    tableName: "SharedItem",
    timestamps: true, // Enables createdAt and updatedAt columns
})
export class SharedItem extends Model<SharedItem> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
    })
    id: string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    sharedToId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sharedToName: string;

    @ForeignKey(() => Note)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    ItemId: string;

    @BelongsTo(() => Note)
    note: Note;  // changed `notes` to `note`

    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    ItemType: string; 

    @ForeignKey(() => Users)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    sharedById: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sharedByName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    permission: string; 
}
