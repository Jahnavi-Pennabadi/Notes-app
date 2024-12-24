import {  useEffect, useState } from 'react';
import { Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './folders.css';
import FolderNotes from '../foldernotes/foldernotes.component';
import { Folder } from '../folder/singlefolder.component';
import SearchInput from '../searchInput/searchinput.component';
import { FolderAddButton } from '../folderAddButton/folderAddButton';
import { ToastContainer } from 'react-toastify';
import { FolderSkeleton } from '../folderSkeleton/folderskelton';
import { getFolders } from '../../features/folder/folder.slice';


const FoldersApp = () => {
  const [folderId, setFolderId] = useState('');
  const dispatch: any = useDispatch();
  const foldersList = useSelector((state: any) => state.folderSlice.foldersList);
  const loading = useSelector((state: any) => state.folderSlice.loading);
  let val = useSelector((s: any) => s.noteSlice.searchVal);
  let createdBy = sessionStorage.getItem('UserID')


  // const filteredFolderList: any = useMemo(() => {foldersList.filter((item: any) =>
  //   (item.name.toLowerCase().includes(val.toLowerCase()))
  // )}, [val, foldersList]);

  const getFolderNotes = (id: string) => {
    setFolderId(id);
  };
  console.log('Folders',foldersList)
  
  useEffect(()=>{
    dispatch(getFolders(sessionStorage.getItem('UserID')))
  },[dispatch])


  let numberOfActiveFolders = 0;
  foldersList.forEach((each: any) => {
    if (each.isActive === false) {
      numberOfActiveFolders += 1;
    }
  });

  return (
    <>
      {folderId ? (
        <FolderNotes folderId={folderId} setFolderId={setFolderId} />
      ) : (
        <div className="folders-container">
          <div className="container">
            <h1 style={{ fontSize: '30px' }}>Folders</h1>
            <div className="search-container">
              <div style={{ marginRight: '15px' }}>
                <SearchInput />
              </div>
              <FolderAddButton />
            </div>
          </div>

          {loading ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                width: '100%',
              }}
            >
              {[...Array(4)].map((_, index) => (
                <FolderSkeleton key={index} />
              ))}
            </div>
          ) : numberOfActiveFolders !== 0 ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                width: '100%',
              }}
            >
              {foldersList ? foldersList.map(
                (item: any) =>
                  !item.isActive &&
                  !item.isDelete && (
                    <Folder key={item.id} item={item} getFolderNotes={getFolderNotes} />
                  )
              ) : <Empty description = 'No folders'/>}
            </div>
          ) : (
            <Empty description="No folders" />
          )}
        </div>
      )}
    </>
  );
};

export default FoldersApp;
