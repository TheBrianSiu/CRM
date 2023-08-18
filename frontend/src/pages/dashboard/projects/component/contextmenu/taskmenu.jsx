import React, { useState } from "react";
import "../styles/taskmenu.css";
import { ContextMenu, MenuItem } from "react-contextmenu";
import EditModal from "./editmodal";

const TaskMenu = ({ task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <ContextMenu id={`contextmenu-${task.id}`}>
        <MenuItem onClick={handleEditClick}>
          <span aria-label="Edit">✏️</span>
          <span>Edit</span>
        </MenuItem>
        <MenuItem>
          <span aria-label="Delete">🗑️</span>
          <span>Delete</span>
        </MenuItem>
      </ContextMenu>
      {isEditModalOpen && (
        <EditModal task={task} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default TaskMenu;
