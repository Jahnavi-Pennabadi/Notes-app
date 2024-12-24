import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { addFolder, editFolder } from "../../features/folder/folder.slice";
import { useDispatch } from "react-redux";


export const FolderAddEditModal = ({ showModal, closeFolderModal,currentFolder }: any) => {
    const [name, setName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [folderId, setFolderId] = useState('');
    const [currentFolderId, setCurrentFolderId] = useState<string>('');
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [folderName, setFolderName] = useState('')



    useEffect(() => {
        if(currentFolder){
            setName(currentFolder.name);
            setCurrentFolderId(currentFolder.id);
            setEditMode(true);
            closeFolderModal(true);
        }
    },[currentFolder])

    const dispatch: any = useDispatch()
    const handleEditFolder = () => {
        if (name.trim()) {
            if(currentFolder.name !== name){
                let data = { name };
                dispatch(editFolder({ id: currentFolderId, data }));    
                
            }
            closeFolderModal(false)
            setEditMode(false);
            setName('');
        }
    };

    const addNewFolder = async () => {
        if (name.trim()) {
            let createdBy = sessionStorage.getItem('UserID')
            let createdByName = sessionStorage.getItem('username')
            const data = { name,createdBy,createdByName };
            await dispatch(addFolder(data));
            closeFolderModal(false)
            setShowDeleteConfirmModal(false);
            setName('');
        } else {
            setFolderName('Name is required')
        }
    };

    const resetFolder = () => {
        setFolderId('');
        setName('');
        setFolderName('');
        closeFolderModal(false)
    };

    return (
        <div>
            <Modal
                title={editMode ? 'Edit Folder' : 'Add a New Folder'}
                open={showModal}
                onOk={editMode ? handleEditFolder : addNewFolder}
                onCancel={resetFolder}
                okText={editMode ? 'Save' : 'Add'}
                cancelText="Cancel"
            >
                <Input
                    id="folder-name"
                    value={name}
                    maxLength={100}
                    onChange={(e) => { setName(e.target.value); setFolderName(''); }}
                    placeholder="Folder Name"
                />
                {folderName && <p style={{ color: 'red' }}>{folderName}</p>}
            </Modal>

        </div>
    )
}