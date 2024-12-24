import React from 'react';
import { Card, Skeleton } from 'antd';
import { images } from '../../assets/images';

export const FolderSkeleton = () => {
  return (
    <Card style={{ width: '230px' }} className="folders-card">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          alignItems: 'center',
        }}
      >
        <Skeleton.Image
          style={{ height: '100px', width: '100px', marginBottom: '10px' }}
          active
        />
        <Skeleton.Button
          style={{
            width: '100%',
            height: '20px',
            marginBottom: '10px',
            marginTop: '10px',
          }}
          active
        />
      </div>
      <Skeleton.Button
        style={{ width: '80px', height: '30px', marginLeft: 'auto', marginRight: 'auto' }}
        active
      />
    </Card>
  );
};
