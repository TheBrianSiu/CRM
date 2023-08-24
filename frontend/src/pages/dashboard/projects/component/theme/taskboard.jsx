import React, { useState, useEffect } from "react";
import Taskitems from "../structures/taskitems";
import Columns from "../structures/columns";
import { HandleSubmit } from "../utils/handlesubmit";
import { HandleUpdate } from "../utils/handleupdate";

const TaskBoard = ({ tasks, setTasks, columns, setColumns }) => {
  const addTask = (status) => {
    const newTask = {
      task_name: "New item",
      due_date: "",
      description: "new description",
      attachments: "",
      est_hours: "",
      est_value: "",
      lead_status: status,
      priority: "",
    };

    try {
      HandleSubmit(newTask);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    try {
      HandleUpdate(taskId, newStatus);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-wrap p-4">
      {columns.map((column) => (
        <Columns
          key={column.id}
          column={column}
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          addTask={addTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
