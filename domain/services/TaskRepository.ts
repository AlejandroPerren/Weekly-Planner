import { Task } from "../entities/Task";

export interface TaskRepository {
  findById(id: number): Promise<Task | null>;
  findAllTaskByCreatorId(creatorId: string): Promise<Task[] | null>;
  createTask(createdBy: string, task: Omit<Task, "id" | "createdBy">): Promise<Task>;
  updateTask(id: number, task: Task): Promise<Task>;
  deleteTask(id: number): Promise<void>;
}
