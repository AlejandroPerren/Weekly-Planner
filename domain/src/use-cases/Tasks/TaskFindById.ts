import { Task } from "../../entities/Task";
import { createInvalidDataError, createNotFoundError, NotFoundError } from "../../errors/error";
import { TaskRepository } from "../../services/TaskRepository";

export interface TaskFindByIdDependencies {
    taskRepository: TaskRepository
}

export interface FindTaskByIdRequestModel{
    id: number
}

export async function findTaskById(
    {taskRepository}: TaskFindByIdDependencies,
    {id}: FindTaskByIdRequestModel
) : Promise<Task | NotFoundError>{
     if (typeof id !== "number" || isNaN(id)) {
        throw createInvalidDataError("Task id must be a number");
    }

    const task = await taskRepository.findById(id);
    if (!task) throw createNotFoundError("Task Not Found");

    return task;
}