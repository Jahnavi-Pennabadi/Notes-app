import { Input, Modal, Switch } from "antd";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNote, editNote } from "../../features/note/note.slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddNote = ({ showAddModal, closeAddModal, currentNote }: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent]: any = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState('');

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setCurrentNoteId(currentNote.id);
      setEditMode(true);
      setShowEditor(true);
      setTextAreaContent(currentNote.content);
    }
  }, [currentNote]);

  const validateForm = () => {
    let isValid = true;
    if (!title.trim()) {
      setTitleError('Title is required.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!content.trim()) {
      setContentError('Content is required.');
      isValid = false;
    } else {
      setContentError('');
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editMode) {
      let createdBy = sessionStorage.getItem('UserID')
      
      if(content !== currentNote.content|| title !== currentNote.title){
        dispatch(editNote({ id: currentNoteId, data: { title, content} }));
      }
    } else {
      let createdBy = sessionStorage.getItem('UserID')
      let createdByName = sessionStorage.getItem('username')
      dispatch(addNote({ title, content, createdBy,createdByName}));
    }
    resetForm();
  };


  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditMode(false);
    setTitleError('');
    setContentError('');
    setTextAreaContent('');
    closeAddModal(false);
    setShowEditor(false);
  };

  const handleEditorChange = (event: any, editor: any) => {
    const rawData = editor.getData();
    const styledData = rawData
      .replace(/<table>/g, `<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">`)
      .replace(/<tr>/g, `<tr style="border: 1px solid #ddd;">`)
      .replace(/<td>/g, `<td style="padding: 8px; text-align: left; border: 1px solid #ddd;">`);
    setContent(styledData);
  };

  const getTextAreaValues = (e: any) => {
    setTextAreaContent(e.target.value);
    setContent(e.target.value);
  };

  return (
    <>
    <Modal
      title={editMode ? 'Edit Note' : 'Add Note'}
      open={showAddModal}
      onOk={handleSubmit}
      onCancel={resetForm}
      okText={editMode ? 'Update' : 'Add'}
      cancelText="Cancel"
      className='modal-props'
    >
      <label>Title</label>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
        style={{ marginBottom: '5px' }}
      />
      {titleError && <p className="error" style={{ color: 'red' }}>{titleError}</p>}
      <div className='switch-changes'>
        <label htmlFor='text-area'>Description</label>
        <div style={{display:'flex'}}>
          <span style={{marginBottom : '9px',paddingRight : '4px'}}>Enrich text</span>
          <Switch checked={showEditor} onChange={() => setShowEditor(!showEditor)} />
        </div>
      </div>
      {showEditor ? (
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={handleEditorChange}
        />
      ) : (
        <TextArea
          id='text-area'
          style={{ minHeight: '330px' }}
          value={textAreaContent}
          placeholder='Describe the activity'
          onChange={getTextAreaValues}
        />
      )}
      {contentError && <p className="error" style={{ color: 'red' }}>{contentError}</p>}
    </Modal>
   </>
  );
};
