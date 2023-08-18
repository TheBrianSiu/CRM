import React, { useState, useEffect } from "react";
import Taskitems from "../structures/taskitems";
import Columns from "../structures/columns";

const TaskBoard = ({ tasks, setTasks, columns, setColumns }) => {
  
  const addTask = (task_name, description, status) => {
    const newTask = {
      project_id: tasks.length + 1,
      task_name,
      description,
      status,
    };
    setTasks([...tasks, newTask]);
    setColumns((prevColumns) => {
      return prevColumns.map((column) =>
        column.id === status
          ? { ...column, taskIds: [...column.taskIds, newTask.id] }
          : column,
      );
    });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.project_id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => ({
        ...column,
        taskIds:
          column.id === newStatus
            ? [...column.taskIds, taskId]
            : column.taskIds.filter((id) => id !== taskId),
      }));
      return updatedColumns;
    });
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
