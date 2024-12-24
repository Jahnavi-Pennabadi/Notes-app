import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { AddNote } from "../addEditNote/addEditNote";

export const AddButton = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const closeAddModal = (val: boolean) => {
    setShowAddModal(val);
  };

  const setVal = () => {
    setShowAddModal(true);
  };

  return (
    <div>
      <Button type="primary" onClick={setVal} icon={<PlusOutlined />}>
        Add
      </Button>
      {showAddModal && (
        <AddNote
          showAddModal={showAddModal}
          closeAddModal={closeAddModal}
        />
      )}
    </div>
  );
};
