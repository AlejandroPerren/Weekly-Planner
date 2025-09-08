import { Task } from "../../entities/Task";
import { createInvalidDataError, createNotFoundError, NotFoundError } from "../../errors/error";
import { TaskRepository } from "../../services/TaskRepository";

export interface TaskUpdateDependencies {
  taskRepository: TaskRepository;
}

export interface UpdateTaskRequestModel {
  id: number;
  task: Task;
}

export async function updateTask(
  { taskRepository }: TaskUpdateDependencies,
  { id, task }: UpdateTaskRequestModel
): Promise<Task | NotFoundError> {
  if (typeof id !== "number" || isNaN(id)) {
    throw createInvalidDataError("Task id must be a number");
  }

  try {
    const updated = await taskRepository.updateTask(id, task);
    return updated;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "NotFoundError"
    ) {
      throw createNotFoundError("Task not found to update");
    }
    throw error; 
  }
}

