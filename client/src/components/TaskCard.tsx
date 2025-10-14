import { useState } from "react";
import type { Task } from "../types/task.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface CardProps {
  task: Task;
}
const TaskCard = ({ task }: CardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return;
  }

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50 bg-gray-200 text-black p-2 rounded shadow-sm"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-gray-200 text-black p-2 rounded shadow-sm"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {task.content}
      {mouseIsOver && (
        <button className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-60 hover:opacity-100">
          <h1>Borrar</h1>
        </button>
      )}
    </div>
  );
};

export default TaskCard;
