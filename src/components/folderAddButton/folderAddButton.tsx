import { PlusOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import { useState } from "react";
import { FolderAddEditModal } from "../folderadd-editmodal/folderaddeditmodal.component";

export const FolderAddButton = () => { 
    const [showFolderModal, setShowFolderModal] = useState(false);
    const closeFolderModal = (val:any) => {
        setShowFolderModal(val)
    }
    
    return(
        <div>
             <Tooltip title="Add new folder">
                <Button className="add-buttons" type='primary' icon={<PlusOutlined />} onClick={() => setShowFolderModal(true)}>
                  Add
                </Button>
                <FolderAddEditModal showModal = {showFolderModal} closeFolderModal = {closeFolderModal}/>
              </Tooltip> 
        </div>
    )
}