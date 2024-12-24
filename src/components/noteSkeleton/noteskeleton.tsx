import React from 'react';
import { List, Card, Skeleton } from 'antd';

const NoteSkeleton = () => (
  <List.Item>
    <Card
      className="notes-card"
      style={{
        overflow: 'auto',
        maxHeight: '200px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Skeleton.Avatar
              active
              shape="square"
              style={{
                height: '70px',
                width: '60px',
                marginRight: '10px',
                borderRadius: '8px',
              }}
            />
          </div>
          <div className="note-content">
            <Skeleton
              active
              title
              paragraph={{ rows: 0 }}
              style={{ width: '150px' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Skeleton.Button
            active
            style={{ width: '80px', marginRight: '20px' }}
          />
          <Skeleton.Button active style={{ width: '80px' }} />
        </div>
      </div>
    </Card>
  </List.Item>
);

export default NoteSkeleton;
