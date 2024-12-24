import React from "react";
import { Skeleton } from "antd";

const SkeletonTrashFolder = () => {
  return (
    <div className="trash-card">
      <Skeleton active loading={true}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <div style={{ width: "50px", height: "50px", backgroundColor: "#f0f0f0", marginRight: "8px" }} />
          <div style={{ width: "100px", height: "15px", backgroundColor: "#f0f0f0", marginTop: "16px" }} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Skeleton.Button style={{ width: "100px", height: "40px", marginLeft: "auto", marginRight: "auto" }} />
        </div>
      </Skeleton>
    </div>
  );
};

export default SkeletonTrashFolder;
