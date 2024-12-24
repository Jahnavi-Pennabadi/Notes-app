import React from "react";
import { Skeleton } from "antd";

const SkeletonTrashNote = () => {
  return (
    <div className="trash-card">
      <Skeleton active loading={true}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            />
            <div style={{ width: "100px", height: "15px", backgroundColor: "#f0f0f0", marginTop: "10px" }} />
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Skeleton.Button style={{ width: "60px", height: "40px", marginLeft: "auto", marginRight: "auto" }} />
        </div>
      </Skeleton>
    </div>
  );
};

export default SkeletonTrashNote;
