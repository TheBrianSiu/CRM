import React from 'react';
import './coupon.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

const TaskMenu = ({ isDragging, task }) => {
  return (
    <div>
      <ContextMenuTrigger id={`contextmenu-${task.id}`}>
        <div className={`rounded-lg border p-4 shadow-md ${isDragging ? "opacity-50" : ""}`}>
          <header>
            <div className="text-sm">{task.title}</div>
          </header>
          <section>
            <div className="text-xs text-gray-600">{task.description}</div>
          </section>
          <footer>
            <div className="text-sm">{task.id}</div>
          </footer>
        </div>
      </ContextMenuTrigger>

      <ContextMenu id={`contextmenu-${task.id}`}>
        <MenuItem>
          <span aria-label="Open with">✏️</span>
          <span>Edit</span>
        </MenuItem>
        <MenuItem>
          <span aria-label="Delete">🗑️</span>
          <span>Delete</span>
        </MenuItem>
        </ContextMenu>
    </div>
  );
};

export default TaskMenu;
