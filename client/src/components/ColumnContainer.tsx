import React from "react";
import type { Column } from "../types/column.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface columnProps {
  column: Column;
}

const ColumnContainer = ({ column }: columnProps) => {
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
        className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-gray-500 "
      >
        {" "}
        <div className="flex gap-2">
          <div className="flex justify-center items-center px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <button>Delete</button>
      </div>
      <div className="">Content</div>
    </div>
  );
};

export default ColumnContainer;
