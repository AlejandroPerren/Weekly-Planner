import { Task } from "entities/Task";

export function createTaskMock(overrides?: Partial<Task>): Task {
  return {
    id: 1,                  
    name: "Test Task",       
    isActive: true,           
    createdBy: "user-1",      
    ...overrides              
  };
}
