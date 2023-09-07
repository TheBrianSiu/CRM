import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/taskmenu.css";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { deleteProjectWithRelatedData } from "../../api/api";

const TaskMenu = ({task}) => {
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  // edit on the the taskitem 
  // const handleEditClick = () => {
  //   setIsEditModalOpen(true);
  // };

  const handleEditRedirect = (id) => {
    // setIsEditModalOpen(false);
    navigate(`edit/${id}`);
  };

  return (
    <div>
      <ContextMenu id={`contextmenu-${task.project_id}`}>
        <MenuItem onClick={() => handleEditRedirect(task.project_id)}>
          <span aria-label="Edit">✏️</span>
          <span>Edit</span>
        </MenuItem>
        <MenuItem onClick={() => deleteProjectWithRelatedData(task.project_id)}>
          <span aria-label="Delete">🗑️</span>
          <span>Delete</span>
        </MenuItem>
      </ContextMenu>
      {/* {isEditModalOpen && (
        <EditModal task={task} onClose={handleCloseEditModal} />
      )} */} 
    </div>
  );
};

export default TaskMenu;
