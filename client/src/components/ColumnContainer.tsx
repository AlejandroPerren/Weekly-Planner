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
        className="bg-gray-800 text-white opacity-60 border-2 border-rose-500 w-[350px] h-[500px] rounded-md max-h-[500px] flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 text-white w-[350px] h-[500px] rounded-md max-h-[500px] flex flex-col shadow-lg"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold bg-gray-900 border-b-4 border-gray-500 flex justify-between items-center"
      >
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-gray-700 px-2 py-1 text-sm rounded-full">
            {tasks.length}
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-gray-900 focus:border-rose-500 text-white border rounded outline-none px-2"
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
        <button className="hover:text-red-500">Delete</button>
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
          className="flex gap-2 items-center rounded-md p-4 hover:bg-gray-700 w-full"
          onClick={() => {
            createTask(column.id);
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ColumnContainer;
