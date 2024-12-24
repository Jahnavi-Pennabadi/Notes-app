import { useDispatch } from "react-redux";
import { editNote } from "../../features/note/note.slice";
import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { images } from "../../assets/images";
import { parseContent } from "../parsecontent/parsecontent";
import { toast } from "react-toastify";

export const TrashNotes = ({item}:any) => {
  let dispatch :any = useDispatch()
    
  const deleteNoteCompletely = (id:any) => {
    let data = {
      isDelete : true,
      isFavourite : false
    }
    let userid = sessionStorage.getItem('UserID')
    dispatch(editNote({id,data}))
  };
  const content = typeof item?.content === 'string' ? item.content : '';

  const parsedNotes = parseContent(content)

    return(
      <div
        key={item.id}
        className='trash-card'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{display : 'flex',alignItems : 'center',justifyContent :'space-around'}}> 
      <img
        src = {images.notesImage}
        alt="note"
        style={{ height: '60px', width: '60px', borderRadius: '8px',marginRight : '10px' }}
      />
      <p style={{ fontWeight: '500', fontSize: '15px',marginTop : '10px' }}>{item.title}</p>
      </div> 
        </div>
        <Popconfirm
        title="Are you sure to delete this note permanently?"
        onConfirm={() => deleteNoteCompletely(item.id)}
        okText="Yes"
        cancelText="No" 
      >
        <Tooltip title = 'Delete note permanently'>
        <Button style={{cursor: 'pointer', color: 'red'}}>
          <DeleteOutlined />
        </Button>
        </Tooltip>
      </Popconfirm>
      </div>
    )
}

