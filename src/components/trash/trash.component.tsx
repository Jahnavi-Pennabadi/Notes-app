import React, { useEffect, useMemo } from 'react';
import { List, Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import { useDispatch, useSelector } from 'react-redux';
import './trash.css'
import { TrashNotes } from '../trashnotes/trashnotes.component';
import { TrashFolders } from '../trashfolders/trashfolders.component';
import SearchInput from '../searchInput/searchinput.component';
import { getFolders } from '../../features/folder/folder.slice';
import { ToastContainer } from 'react-toastify';
import NoteSkeleton from '../noteSkeleton/noteskeleton';
import SkeletonTrashFolder from '../trashFolderSkeleton/trashfolderskeleton';
import { getNote } from '../../features/note/note.slice';

const Trash: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const notesList = useSelector((state: any) => state.noteSlice.notesList);
  const foldersList = useSelector((state: any) => state.folderSlice.foldersList);
  const val = useSelector((s: any) => s.noteSlice.searchVal);
  const notesLoading = useSelector((s: any) => s.noteSlice.loading);
  const foldersLoading = useSelector((s: any) => s.folderSlice.loading)

  const NoteList = notesList.filter((item: any) =>
  (item.title.toLowerCase().includes(val.toLowerCase()) ||
    item.content.toLowerCase().includes(val.toLowerCase()))
  );

  const TrashNotesList = NoteList.filter((item: any) => (
    item.isActive === true && item.isDelete === false
  ))

  const FolderList = useMemo(() => foldersList.filter((item: any) =>
    (item.name.toLowerCase().includes(val.toLowerCase()))
  ), [val, foldersList]);

  let dispatch: any = useDispatch()
  let createdBy:any = sessionStorage.getItem('UserID')
  useEffect(() => {
    dispatch(getFolders(createdBy))

  }, [])

  const TrashFoldersList = FolderList.filter((item: any) => (
    item.isActive === true && item.isDelete === false
  ))

  let trashfolderscount = 0
  {
    TrashFoldersList.map((each: any) => {
      if (each.isActive === false) {
        trashfolderscount += 1
      }
    })
  }

  let trashnotescount = 0
  {
    NoteList.map((each: any) => {
      if (each.isActive === false) {
        trashnotescount += 1
      }
    })
  }

  const items = [
    {
      label: 'Notes',
      key: 'notes',
      children: (
        <div className='trash-card-container'>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={TrashNotesList}
            renderItem={notesLoading ? () => <NoteSkeleton /> : (item: any) => (
              <TrashNotes item={item} />
            )}
          />
        </div>
      ),
    },
    {
      label: 'Folders',
      key: 'folders',
      children: (
        <div className='trash-card-container'>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={TrashFoldersList}
            renderItem={foldersLoading ? () => <SkeletonTrashFolder/> :(item) => (
              <TrashFolders item={item} />
            )} />
        </div>
      ),
    },
  ];

  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <div>
      <div className='trash-search-container'>
        <h1>Trash</h1>
        <SearchInput />
      </div>
      <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }} >
        <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
      </StickyBox>
    </div>
  );

  return (
    <Tabs
      defaultActiveKey="notes"
      items={items}
      renderTabBar={renderTabBar}
    />
  );
};

export default Trash;
