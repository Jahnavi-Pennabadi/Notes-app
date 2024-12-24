import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, Tooltip } from "antd"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePartialNote } from "../../features/note/note.slice";
import { FolderAddEditModal } from "../folderadd-editmodal/folderaddeditmodal.component";
import { toast } from "react-toastify";
import { updatePartialFolder } from "../../features/folder/folder.slice";

const FolderActions = ({ item}: any) => {
  const [showEditModal,setShowEditModal] = useState(false)
  const [currentFolder,setCurrentFoler] = useState()
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string>('');

  const dispatch: any = useDispatch();
  const openDeleteConfirmModal = (id: string) => {
    setNoteToDelete(id);
    setShowDeleteConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
  };
  let FolderList= useSelector((s: any) => s.folderSlice.foldersList)


  const deleteFolder = (id:any) => {
    setShowDeleteConfirmModal(false)
      if(noteToDelete)
      dispatch(updatePartialFolder({ id: noteToDelete, data: { isActive: true } }));
    
  
  };

  const openShowEditModal = (item:any) => {
    setCurrentFoler(item)
    setShowEditModal(true)
  }

  const closeFolderModal = (val:any) => {
    setShowEditModal(val)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', paddingTop: '10px' }}>
        <Tooltip title="Edit the name of folder">
          <Button onClick={() => openShowEditModal(item)} icon={<EditOutlined />} />
        </Tooltip>
        {showEditModal ? <FolderAddEditModal showModal = {showEditModal} closeFolderModal = {closeFolderModal} currentFolder = {currentFolder}/> : ''}
        <Tooltip title="Click on the button to move to trash">
          <Button onClick={() => openDeleteConfirmModal(item.id)} icon={<DeleteOutlined />} />
        </Tooltip>
      </div>
      <Modal
        title="Move to trash"
        open={showDeleteConfirmModal}
        onOk={() =>deleteFolder(item.id)}
        onCancel={handleCancelDelete}
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          style: {
            backgroundColor: 'red',
            color: 'white',
            borderColor: 'red',
          },
        }}
      >
        <p style={{ fontSize: '15px' }}>
          Are you sure you want to move this folder to the trash?
        </p>
      </Modal>

    </div>
  )
}

export default FolderActions