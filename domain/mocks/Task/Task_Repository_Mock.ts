import { Task } from "entities/Task";
import { TaskRepository } from "services/TaskRepository";

export interface MockedTaksRepository extends TaskRepository {
  tasks: Task[];
}

let taskIdCounter = 0;

export function createTaskRepositoryMock(
  tasks: Task[] = []
): MockedTaksRepository {
  return {
    tasks,
    findAllTaskByCreatorId: async function (
      creatorId: string
    ): Promise<Task[] | null> {
      const taskList = this.tasks.filter(
        (task) => task.createdBy === creatorId
      );
      return taskList.length > 0 ? taskList : null;
    },
    findById: async function (taskId: number): Promise<Task | null> {
      const task = this.tasks.find((task) => task.id === taskId);
      return task || null;
    },
    createTask: async function (
      creatorId: string,
      task: Omit<Task, "id" | "createdBy">
    ): Promise<Task> {
      const newTask: Task = {
        id: ++taskIdCounter,
        createdBy: creatorId,
        ...task,
      };
      return newTask;
    },
    updateTask: async function (taskId:number, task: Task): Promise<Task> {
      const index = this.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        this.tasks[index] = task;
      }
      return task;
    },
    deleteTask: async function (taskId:number): Promise<void> {
      const index = this.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
  };
}
