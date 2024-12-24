import { DeleteOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Tooltip } from "antd"
import { editFolder } from "../../features/folder/folder.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


export const TrashFolders = ({item}:any) => {
  let dispatch:any = useDispatch()
    
  const deleteFolderCompletely = (id: string) => {
    let data = {
      isDelete : true,      
      isFavourite : false
    }
    dispatch(editFolder({id,data}))
  };

    return(
    <div
      key={item.id}
      className="trash-card-folder">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <img
          style={{ width: '50px', marginRight: '8px' }}
          src="https://th.bing.com/th/id/OIP.B-nkDA9a-3q0lDiwTlUgEQAAAA?w=241&h=193&c=7&r=0&o=5&dpr=1.1&pid=1.7"
          alt="Folder Icon" 
        />
        <p style={{ fontSize: '15px', fontWeight: '500', paddingTop: '6px' }}>
          {item.name}
        </p>
      </div>
      </div>
      <Popconfirm
        title="Are you sure to delete this folder permanently?"
        onConfirm={() => deleteFolderCompletely(item.id)}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title = "Delete folder permanently">
        <Button style={{ cursor: 'pointer', color: 'red' }}>
          <DeleteOutlined />
        </Button>
        </Tooltip>
      </Popconfirm>
    </div>
    )
}