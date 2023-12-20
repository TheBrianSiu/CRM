import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Taskitems } from './taskitems';

export function Columns({ column, tasks, updateTaskStatus, addTask }) {
  const [isOver, setIsOver] = useState(false);

  const [, drop] = useDrop({
    accept: 'task',
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
        // minWidth: "6rem",
        maxWidth: '15rem',
        backgroundColor: column.backgroundColor,
        height: '80vh',
        opacity: isOver ? 0.8 : 1,
        overflow: 'hidden',
      }}
    >
      <div className="group mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">{column.leadStatus}</h3>
        <div
          style={{ minWidth: '3rem', textAlign: 'center' }}
          className="min-w-20 cursor-pointer justify-end p-2  transition-colors duration-300 group-hover:bg-gray-500 group-hover:text-white"
          onClick={() => {
            addTask(column.id);
          }}
        >
          +
        </div>
      </div>
      <div
        className="column-container relative "
        style={{
          backgroundColor: column.backgroundColor,
          height: '80vh',
          opacity: isOver ? 0.8 : 1,
          overflowY: 'auto',
        }}
      >
        <div className="flex-1">
          {column.taskIds.map((taskId) => {
            const task = tasks.find((task) => task.projectId === taskId);
            return <Taskitems task={task} columnId={column.id} />;
          })}
        </div>
      </div>
      <div
        className="align-flex absolute bottom-0 left-0 right-0 mt-2 cursor-pointer rounded-lg bg-blue-gray-50 p-2 text-center"
        onClick={() => {
          addTask(column.id);
        }}
      >
        + New
      </div>
    </div>
  );
}

export default Columns;
