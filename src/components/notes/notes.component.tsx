import { useEffect, useMemo } from 'react';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getNote, getNoteList } from '../../features/note/note.slice';
import './notes.css';
import Note from '../note/note.component';
import SearchInput from '../searchInput/searchinput.component';
import { AddButton } from '../addButton/addButton';
import NoteSkeleton from '../noteSkeleton/noteskeleton';
import { ToastContainer } from 'react-toastify';
import { getAllUsers } from '../../features/user/user.slice';

const NotesApp = () => {
  const dispatch: any = useDispatch();
  const notesLists = useSelector((state: any) => state.noteSlice.notesList || []); 
  const displayData = useSelector((state: any) => state.noteSlice.displaySharedNote || []);
  const searchVal = useSelector((state: any) => state.noteSlice.searchVal || '');
  const Loading = useSelector((state: any) => state.noteSlice.loading);
  const createdBy = sessionStorage.getItem('UserID');

  useEffect(() => {
    dispatch(getNote(createdBy));
    dispatch(getAllUsers());
  }, [dispatch, createdBy]);

  const combinedNotes = useMemo(() => {
    const notesSet = new Set(notesLists.map((note: any) => note.id)); 
    const uniqueDisplayData = displayData.filter((note: any) => !notesSet.has(note.id)); 
    return [...notesLists, ...uniqueDisplayData];
  }, [notesLists, displayData]);

  const mainList = useMemo(() => {
    return combinedNotes.filter(
      (note: any) => note.isActive === false && note.isDelete === false
    );
  }, [combinedNotes]);

  const filteredNotes = useMemo(() => {
    return mainList.filter((note: any) =>
      note.title.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [mainList, searchVal]);

  const renderItem = (item: any) => {
    if (Loading) {
      return <NoteSkeleton key={item.id} />;
    }
    return <Note item={item} />;
  };

  return (
    <div className="notes-container">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
        <h1>Notes</h1>
        <div className="search-container">
          <div className="search-margin">
            <SearchInput />
          </div>
          <AddButton />
        </div>
      </div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredNotes}
        renderItem={renderItem}
      />
    </div>
  );
};

export default NotesApp;
