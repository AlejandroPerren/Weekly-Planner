import { Task } from "../../entities/Task";
import { createInvalidDataError } from "../../errors/error";
import { TaskRepository } from "../../services/TaskRepository";

export interface TaskCreateDependencies {
  taskRepository: TaskRepository;
}

export interface CreateTaskRequestModel {
  createdBy: string;
  task: Omit<Task, "id" | "createdBy">;
}

export async function createTask(
  { taskRepository }: TaskCreateDependencies,
  { createdBy, task }: CreateTaskRequestModel
): Promise<Task> {
  if (!createdBy || typeof createdBy !== "string") {
    throw createInvalidDataError("createdBy must be a string");
  }
  if (!task || typeof task !== "object") {
    throw createInvalidDataError("Task must be a valid object");
  }

  if (!task.name || typeof task.name !== "string") {
    throw createInvalidDataError("Task name must be a string");
  }

  if (typeof task.isActive !== "boolean") {
    throw createInvalidDataError("Task isActive must be a boolean");
  }

  return await taskRepository.createTask(createdBy, task);
}
