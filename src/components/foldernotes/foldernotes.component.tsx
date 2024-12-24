import { useMemo, useState } from "react";
import { Button, Input, List, Modal, Card, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../features/note/note.slice"; 
import { ArrowLeftOutlined, FileAddOutlined } from "@ant-design/icons";
import './foldernotes.css'
import { FolderNotesCard } from "../foldernotescard/foldernotescard.component";

const FolderNotes = ({ folderId ,setFolderId }: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState(""); 
    const [noteContent, setNoteContent] = useState(""); 
    const [editMode, setEditMode] = useState(false);
    const [noteIndex, setNoteIndex] = useState<number | null>(null);
 
    const dispatch: any = useDispatch();
    const foldersList = useSelector((state: any) => state.folderSlice.foldersList);
    const notesList = useSelector((state: any) => state.noteSlice.notesList);
    const Notes = notesList.filter((item:any) => item.folderId === folderId)
    const val = useSelector((s: any) => s.noteSlice.searchVal);

    const NoteList =useMemo(() =>  Notes.filter((item: any) => 
    (item.title.toLowerCase().includes(val.toLowerCase()) || 
    item.content.toLowerCase().includes(val.toLowerCase())) 
    ),[val,Notes]);

    const folder = foldersList.find((item: any) => item.id === folderId);
    
    const showAddNoteModal = () => {
        setEditMode(false); 
        setNoteTitle("");
        setNoteContent(""); 
        setIsModalVisible(true);
    };

    const showEditNoteModal = (index: number, note: { title: string; content: string }) => {
        setEditMode(true); 
        setNoteIndex(index); 
        setNoteTitle(note.title); 
        setNoteContent(note.content); 
        setIsModalVisible(true);
    };
   
    const handleCancel = () => {
        setIsModalVisible(false);  
    };

    const handleAddNote = () => {
        if (noteTitle.trim() && noteContent.trim()) {
            dispatch(addNote({ folderId: folderId, title: noteTitle, content: noteContent }));
            setNoteTitle("");
            setNoteContent(""); 
            setIsModalVisible(false); 
        }
    };

    const handleEditNote = () => {
        if (noteTitle.trim() && noteContent.trim() && noteIndex !== null) {
            dispatch(addNote({ folderId: folderId, title: noteTitle, content: noteContent }));
            setNoteTitle(""); 
            setNoteContent(""); 
            setIsModalVisible(false); 
        }
    };

    if (!folder) {
        return <div>Folder not found</div>;
    }

    const showFoldersComponent = () => {
        setFolderId('')
    }
    
    return (
        <div className="folders-notes-container">
            <h1 >{folder.name}</h1>
            <div style={{display: 'flex',alignItems:'center',width:'920px',justifyContent:'space-between'}}>
                <Tooltip title = 'Go back to folders page'>
                <Button onClick = {showFoldersComponent} style={{backgroundColor:'black',color:'white'}}>
                    <ArrowLeftOutlined/>                    
                </Button>
                </Tooltip>
                <Tooltip title = 'Add new note'>
                <Button onClick={showAddNoteModal} type="primary">
                Add<FileAddOutlined style={{ fontSize: '22px' }} />
                </Button>
                </Tooltip>
            </div>
            <Modal
                title={editMode ? "Edit Note" : "Add a New Note"}
                open={isModalVisible}
                onOk={editMode ? handleEditNote : handleAddNote}
                onCancel={handleCancel}
                okText={editMode ? "Save" : "Add"}
                cancelText="Cancel"
        
            >
                <div className="notes-input-container">
                    <Card className="notes-input-card" style={{ padding: "0px", height: "200px" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div style={{ width: "93%" }}>
                                <div className="input-group" style={{ padding: "0px" }}>
                                    <Input
                                        id="note-title"
                                        value={noteTitle}
                                        onChange={(e) => setNoteTitle(e.target.value)}
                                        style={{
                                            border: "none",
                                            backgroundColor: "transparent",
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="input-group">
                                    <Input
                                        id="note-content"
                                        value={noteContent}
                                        onChange={(e) => setNoteContent(e.target.value)}
                                        style={{ border: "none", backgroundColor: "transparent", color: "black" }}
                                        placeholder="Write your note..."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </Modal>

            <div style={{ marginTop: "20px" }}>
                <h2 >Notes:</h2>
                {NoteList.length !== 0 ? (
                    <List
                        dataSource={NoteList}
                        renderItem={(note: { title: string, content: string }, index: number) => (
                            <FolderNotesCard index = {index} note = {note} showEditNoteModal = {showEditNoteModal}/>
                        )}
                    />
                ) : (
                    <div style={{textAlign : 'center',marginTop : '100px'}}>
                             <img
              src="https://th.bing.com/th/id/OIP.vs6IQFAKd7FGR2dp88w9iAHaHa?rs=1&pid=ImgDetMain" // Replace with a valid image URL or local asset
              alt="No notes"
              style={{ width: '150px', marginBottom: '20px' }}
            />
       
                    <p>No notes available</p>
                    <p>Click on above "Add" button to add a new note ...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FolderNotes;
