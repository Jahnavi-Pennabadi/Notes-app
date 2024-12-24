import { Skeleton, List } from 'antd';

const SkeletonWishlistCard = () => (
  <List.Item>
    <div style={{
      display: 'flex', alignItems: 'center', border: '1px solid #e6e6e6', justifyContent: 'space-between',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', height: '90px', borderRadius: '6px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton.Image style={{ width: 60, height: 60, paddingLeft: '9px', marginRight: '15px' }} />
        <Skeleton.Button active style={{ width: 120, height: 20 }} />
      </div>
      <div>
        <Skeleton.Button active style={{ width: 30, height: 30 }} />
      </div>
    </div>
  </List.Item>
);

export default SkeletonWishlistCard;
