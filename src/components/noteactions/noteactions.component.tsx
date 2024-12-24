import { HeartOutlined, DeleteOutlined, EditOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePartialNote } from '../../features/note/note.slice';
import { AddNote } from '../addEditNote/addEditNote';
import { postNotification } from '../../features/notifications/notifications.slice';
import './noteactions.css';

interface Note {
    id: string;
    title: string;
    content: string;
    isFavorite: boolean;
    isActive: boolean;
    isDelete?: boolean;
}

const NoteActions = React.memo(({ item }: any) => {
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
    const [shareNote, setShareNote] = useState(false);
    const [sentusersIds, setSentUsersIds] = useState<any>([]);
    const [sentUserNames, setUserNames] = useState<any>([]);
    const [permission, setPermission] = useState('');
    const dispatch: any = useDispatch();

    const notesList = useSelector((state: any) => state.noteSlice.notesList);
    const getUserList = useSelector((s: any) => s.userSlice.UsersList);
    const user = sessionStorage.getItem('UserID');
    const Users = getUserList.filter((each: any) => each.id !== user);

    const toggleFavorite = (id: string) => {
        const note = notesList.find((note: Note) => note.id === id);
        if (note) {
            dispatch(
                updatePartialNote({
                    id,
                    data: { isFavorite: !note.isFavorite },
                })
            );
        }
    };

    const onDelete = (id: string) => {
        setNoteToDelete(id);
        setShowDeleteConfirmModal(true);
    };

    const handleDelete = () => {
        if (noteToDelete) {
            dispatch(updatePartialNote({ id: noteToDelete, data: { isActive: true } }));
        }
        setShowDeleteConfirmModal(false);
    };

    const openShareDialogBox = () => {
        const userId = sessionStorage.getItem('UserID');
        const userName = sessionStorage.getItem('username');
        const data = {
            sharedToId: sentusersIds,
            sharedToName: sentUserNames,
            ItemId: item.id,
            ItemType: 'Note',
            sharedById: userId,
            sharedByName: userName,
            permission: permission,
        };

        dispatch(postNotification(data));
        setUserNames([]);
        if (sentUserNames && permission) {
            setShareNote(false);
        }
        setSentUsersIds([]);
        setPermission('');
    };

    const closeShareDialogBox = () => {
        setShareNote(false);
        setUserNames([]);
        setSentUsersIds([]);
        setPermission('');
    };

    const onShareNote = () => {
        setShareNote(true);
    };

    const getSentUsersId = (isChecked: boolean, id: any, name: any) => {
        if (isChecked) {
            setSentUsersIds((prevState: any) => [...prevState, id]);
            setUserNames((prevState: any) => [...prevState, name]);
        } else {
            setSentUsersIds((prevState: any) => prevState.filter((userId: any) => userId !== id));
            setUserNames((prevState: any) => prevState.filter((userName: any) => userName !== name));
        }
    };

    const closeAddModal = (val: boolean) => {
        setShowEditModal(val);
    };

    return (
        <div className="note-actions" style={{marginRight : '18px' ,marginBottom: '4px', marginTop: '0' }}>
            <Button
                icon={<HeartOutlined style={{ color: item.isFavorite ? 'red' : undefined }} />}
                onClick={() => toggleFavorite(item.id)}
                className='note-action-button'
                title={item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            />
            <Button
                icon={<DeleteOutlined />}
                onClick={() => onDelete(item.id)}
                className='note-action-button'
                title="Delete"
            />
            <Button
                icon={<ShareAltOutlined />}
                onClick={onShareNote}
                title="Share"
                className='note-action-button'
            />

            {showEditModal && (
                <AddNote
                    showAddModal={showEditModal}
                    closeAddModal={closeAddModal}
                    currentNote={currentNote}
                />
            )}

            <Modal
                title="Confirm Deletion"
                open={showDeleteConfirmModal}
                onOk={handleDelete}
                onCancel={() => setShowDeleteConfirmModal(false)}
                okText = "Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this note?</p>
            </Modal>

            <Modal
                open={shareNote}
                okText="Send"
                onOk={openShareDialogBox}
                onClose={closeShareDialogBox}
                onCancel={closeShareDialogBox}
                className="share-note-modal"
            >
                <div className="share-note-modal-content">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontSize: '20px', marginRight: '8px' }}>Share Notes</p>
                        <ShareAltOutlined />
                    </div>
                    <div className="user-list-container">
                        <label className="user-list-title">Select Users</label>
                        <ul className="user-list">
                            {Users.map((each: any) => (
                                <li key={each.id} className="user-list-item">
                                    <Checkbox
                                        onChange={(e) => getSentUsersId(e.target.checked, each.id, each.name)}
                                        className="user-checkbox"
                                        checked={sentusersIds.includes(each.id)}
                                    >
                                        <UserOutlined />
                                        {each.email}
                                    </Checkbox>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="permissions-container">
                        <label htmlFor="radio" className="permissions-label">Permission</label>
                        <Radio.Group
                            id="radio"
                            onChange={(e) => setPermission(e.target.value)}
                            value={permission}
                            className="permissions-group"
                        >
                            <Radio value="view" className="permission-option">View</Radio>
                            <Radio value="edit" className="permission-option">Edit</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </Modal>
        </div>
    );
});

export default NoteActions;
