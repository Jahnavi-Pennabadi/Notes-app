
import { Card } from 'antd';
import  FolderActions  from '../folderactions/folderactions.component';
import { images } from '../../assets/images';
import React from 'react';


export const Folder = React.memo(({ item,getFolderNotes }:any) => {
  console.log('folder',item)
  return (
    <Card key={item.id} style={{ width: '230px' }} className='folders-card'>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        alignItems: 'center',
      }}
      onClick={() => getFolderNotes(item.id)}>
    <img
        style={{ height: '100px', width: '100px', marginBottom: '10px' }}
        src={images.folderImage}
        alt="Folder Thumbnail"
      />
      <h1 style={{ fontSize: '20px', textAlign: 'center' }}>{item.name}</h1>
    </div>
    <FolderActions item ={item}/>
  </Card>
  );
});
