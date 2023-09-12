import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import TaskMenu from "../contextmenu/taskmenu";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ContextMenuTrigger } from "react-contextmenu";

export function Taskitems({ task, columnId }) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "task",
    item: task ? { taskId: task.project_id, columnId } : null,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (task) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, [preview, task]);

  if (!task) {
    return null;
  }

  return (
    <ContextMenuTrigger id={`contextmenu-${task.project_id}`}>
      <div
        ref={(node) => drag(node)}
        className={`rounded-lg border p-4 shadow-md ${
          isDragging ? "opacity-50" : ""
        }`}
        onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
      >
        <header className="grid grid-cols-3">
          <div className="col-span-2 text-sm font-bold">{task.task_name}</div>
          <TaskMenu task={task} />
        </header>
        <section>
          <div className="text-xs text-gray-600">{task.description}</div>
        </section>
        <footer>
          <div className="text-sm">{task.priority}</div>
        </footer>
      </div>
    </ContextMenuTrigger>
  );
}

export default Taskitems;
