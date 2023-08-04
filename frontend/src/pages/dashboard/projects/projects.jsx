import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import TaskMenu from "./component/taskmenu"; 

const Projects = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description for Task 1",
      status: "todo", // Change this to "todo"
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description for Task 2",
      status: "doing",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description for Task 3",
      status: "review", // Change this to "review"
    },
    // Add more tasks as needed...
  ]);

  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "Todo",
      taskIds: tasks
        .filter((task) => task.status === "todo")
        .map((task) => task.id),
      backgroundColor: "#F1F1EF",
    },
    {
      id: "doing",
      title: "Doing",
      taskIds: tasks
        .filter((task) => task.status === "doing")
        .map((task) => task.id),
      backgroundColor: "#E9F3F7",
    },
    {
      id: "review",
      title: "Review",
      taskIds: tasks
        .filter((task) => task.status === "review")
        .map((task) => task.id),
      backgroundColor: "#EEF3ED",
    },
    {
      id: "done",
      title: "Done",
      taskIds: tasks
        .filter((task) => task.status === "done")
        .map((task) => task.id),
      backgroundColor: "#FAF3DD",
    },
    // Add more columns as needed...
  ]);

  const addTask = (title, description, status) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      status,
    };
    setTasks([...tasks, newTask]);
    setColumns((prevColumns) => {
      return prevColumns.map((column) =>
        column.id === status
          ? { ...column, taskIds: [...column.taskIds, newTask.id] }
          : column
      );
    });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
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

  const TaskItem = ({ task, columnId }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "task",
      item: { taskId: task.id, columnId },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    return (
      <div ref={(node) => drag(node)}>
        <TaskMenu isDragging={isDragging} task={task} />
      </div>
    );
  };

  const Column = ({ column }) => {
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
          maxWidth: "300px",
          backgroundColor: column.backgroundColor,
          overflowY: "auto",
          maxHeight: "80vh",
          opacity: isOver ? 0.8 : 1,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{column.title}</h3>
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
            const task = tasks.find((task) => task.id === taskId);
            return <TaskItem key={taskId} task={task} columnId={column.id} />;
          })}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 mt-2 cursor-pointer rounded-lg bg-blue-gray-50 p-2 text-center"
          onClick={() => {
            addTask("New Task", "Description", column.id);
          }}
        >
          + New
        </div>
      </div>
    );
  };
  return (
    <div className="flex min-h-screen flex-wrap p-4">
      {/* Render the columns */}
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Projects;
