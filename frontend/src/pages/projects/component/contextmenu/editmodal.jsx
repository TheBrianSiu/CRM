import React, { useState } from "react";

const EditModal = ({ task, onClose }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleSave = () => {
    console.log("Edited Title:", editedTitle);
    console.log("Edited Description:", editedDescription);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <label>Title:</label>
        <input type="text" value={editedTitle} onChange={handleTitleChange} />
        <label>Description:</label>
        <textarea
          value={editedDescription}
          onChange={handleDescriptionChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
