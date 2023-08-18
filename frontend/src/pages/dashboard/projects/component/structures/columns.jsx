import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Taskitems } from "./taskitems";

export function Columns({ column, tasks, updateTaskStatus, addTask }) {
  const [isOver, setIsOver] = useState(false);

  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      const { taskId, columnId } = item;

      // Check if it is dropped back into the same column
      if (taskId && columnId !== column.id) {
        updateTaskStatus(taskId, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="column-container relative rounded-lg p-4 shadow-md"
      style={{
        minWidth: "250px",
        maxWidth: "290px",
        backgroundColor: column.backgroundColor,
        overflowY: "auto",
        maxHeight: "80vh",
        opacity: isOver ? 0.8 : 1,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">{column.lead_status}</h3>
        <div
          className="justify-end"
          onClick={() => {
            addTask("New Task", "Desc", column.id);
          }}
        >
          +
        </div>
      </div>
      <div className="flex-1">
        {column.taskIds.map((taskId) => {
          const task = tasks.find((task) => task.project_id === taskId);
          return <Taskitems task={task} columnId={column.id} />;
        })}
      </div>
      {/* <div
              className="absolute bottom-0 left-0 right-0 mt-2 cursor-pointer rounded-lg bg-blue-gray-50 p-2 text-center"
              onClick={() => {
                addTask("New Task", "Description", column.id);
              }}
            >
              + New
            </div> */}
    </div>
  );
}

export default Columns;
