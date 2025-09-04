import { Task } from "../entities/Task";

export interface TaskRepository {
  findById(id: number): Promise<Task | null>;
  findAllTaskByCreatorId(creatorId: number): Promise<Task[] | null>;
  createTask(creatorId: number, task: Task): Promise<Task>;
  updateTask(id: number, task: Task): Promise<Task>;
  deleteTask(id: number): Promise<boolean>;
}