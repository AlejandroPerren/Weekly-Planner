import { Task } from "../entities/Task";

export interface TaskRepository {
  findById(id: number): Promise<Task | null>;
  createTask(task: Task): Promise<Task>;
  findAllTask(): Promise<Task[] | null>;
  updateTask(id: number, task: Task): Promise<Task>;
  deleteTask(id: number): Promise<boolean>;
}