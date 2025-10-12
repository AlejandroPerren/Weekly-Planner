import React, { useMemo, useState } from "react";
import type { Column } from "../types/column.type";
import ColumnContainer from "../components/ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import type { Task } from "../types/task.types";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

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

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const activeColumId = active.id;
    const overColumnId = over.id;

    if (activeColumId === overColumnId) return;

    setColumns((columns) => {
      const activeColumIndex = columns.findIndex(
        (col) => col.id === activeColumId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumIndex, overColumnIndex);
    });
  }

  function updateColumn(id: number, title: string) {
    const newColumns = columns.map((col) =>
      col.id === id ? { ...col, title } : col
    );
    setColumns(newColumns);
  }

  function createTask(columnId: number) {
    const newTask: Task = {
      id: tasks.length + 1,
      columnId,
      content: "Tareaaa",
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="m-auto text-white bg-black min-h-screen w-full px-[40px] items-center">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-2">
            <SortableContext items={columns}>
              {columns.map((col) => (
                <ColumnContainer
                  createTask={createTask}
                  column={col}
                  updateColumn={updateColumn}
                  key={col.id}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
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
            {activeColumn && (
              <ColumnContainer
                createTask={createTask}
                updateColumn={updateColumn}
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
