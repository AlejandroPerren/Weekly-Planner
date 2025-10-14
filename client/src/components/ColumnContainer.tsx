import React, { useMemo, useState } from "react";
import type { Column } from "../types/column.type";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/task.types";
import TaskCard from "./TaskCard";
interface columnProps {
  column: Column;
  updateColumn: (id: number, title: string) => void;
  //Delete
  createTask: (columnId: number) => void;
  tasks: Task[];
}

const ColumnContainer = ({
  column,
  updateColumn,
  createTask,
  tasks,
}: columnProps) => {
  const [editMode, setEditMode] = useState(false);

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
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
        className="bg-white text-black opacity-60 border-2 border-rose-500 w-[350px] h-[500px] rounded-md max-h-[500px] flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white text-black w-[350px] h-[500px] rounded-md max-h-[500px] flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-gray-500 "
      >
        {" "}
        <div className="flex gap-2">
          <div className="flex justify-center items-center px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 text-white border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button>Delete</button>
      </div>
      <div className="flex flex-grow flex-col overflow-y-auto p-2 gap-2">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      <div>
        <button
          className="flex gap-2 items-center rounded-md p-4 hover:text-rose-500"
          onClick={() => {
            createTask(column.id);
          }}
        >
          Añadir Tareas
        </button>
      </div>
    </div>
  );
};

export default ColumnContainer;
