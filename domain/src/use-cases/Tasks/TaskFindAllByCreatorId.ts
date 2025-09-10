import { Task } from "../../entities/Task";
import { createInvalidDataError, createNotFoundError, NotFoundError } from "../../errors/error";
import { TaskRepository } from "../../services/TaskRepository";

export interface TaskFindAllByCreatorIdDependencies {
  taskRepository: TaskRepository;
}

export interface FindAllTaskByCreatorIdRequestModel {
  creatorId: string;
}

export async function findAllTaskByCreatorId(
  { taskRepository }: TaskFindAllByCreatorIdDependencies,
  { creatorId }: FindAllTaskByCreatorIdRequestModel
): Promise<Task[]> {
  if (!creatorId || typeof creatorId !== "string") {
    throw createInvalidDataError("CreatorId must be a string");
  }

  const tasks = await taskRepository.findAllTaskByCreatorId(creatorId);
  if (!tasks || tasks.length === 0) {
    throw createNotFoundError("No tasks found for this creator");
  }

  return tasks;
}
