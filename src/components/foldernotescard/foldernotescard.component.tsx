import { List } from "antd"

export const FolderNotesCard = ({index,note}:any) => {
    return(
        <List.Item key={index}>
        <div className="notes-card-folder">
        <div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        </div>
        <div style={{display : 'flex',marginRight : '23px',padding : '10px'}}>
        </div>
        </div>
    </List.Item>
    )
}