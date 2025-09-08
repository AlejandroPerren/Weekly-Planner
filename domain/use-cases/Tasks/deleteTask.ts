import { createInvalidDataError, createNotFoundError } from "../../errors/error";
import { TaskRepository } from "../../services/TaskRepository";

export interface TaskDeleteDependencies {
  taskRepository: TaskRepository;
}

export interface DeleteTaskRequestModel {
  id: number;
}

export async function deleteTask(
  { taskRepository }: TaskDeleteDependencies,
  { id }: DeleteTaskRequestModel
): Promise<void> {
  if (typeof id !== "number" || isNaN(id)) {
    throw createInvalidDataError("Task id must be a number");
  }

  const existing = await taskRepository.findById(id);
  if (!existing) throw createNotFoundError("Task not found to delete");

  await taskRepository.deleteTask(id);
}
