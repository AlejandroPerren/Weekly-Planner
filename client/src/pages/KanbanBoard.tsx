import React, { useMemo, useState } from "react";
import type { Column } from "../types/column.type";
import ColumnContainer from "../components/ColumnContainer";
import { DndContext, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  function createNewColumn() {
    const columnToAdd: Column = {
      id: columns.length + 1,
      title: "Column",
    };
    setColumns([...columns, columnToAdd]);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  return (
    <div className="m-auto text-white bg-black min-h-screen w-full px-[40px] items-center">
      <DndContext onDragStart={onDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-2">
            <SortableContext items={columns}>
              {columns.map((col) => (
                <ColumnContainer column={col} key={col.id} />
              ))}
            </SortableContext>
          </div>

          <button
            onClick={() => {
              createNewColumn();
            }}
            className="h-[60px] w-[350px] cursor-pointer text-white"
          >
            AddColumn
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
