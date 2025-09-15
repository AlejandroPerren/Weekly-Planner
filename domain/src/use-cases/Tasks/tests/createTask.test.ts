import { beforeEach, describe, expect, it } from "vitest";
import {
  createTaskRepositoryMock,
  MockedTaksRepository,
} from "../../../mocks/Task/Task_Repository_Mock";
import { createTask, TaskCreateDependencies } from "../createTask";

describe("createTask", () => {
  let _mockedTaskRepository: MockedTaksRepository;
  let _dependencies: TaskCreateDependencies;

  beforeEach(() => {
    _mockedTaskRepository = createTaskRepositoryMock([]);
    _dependencies = { taskRepository: _mockedTaskRepository };
  });

  it("given an invalid createdBy (number), when calling createTask, then throws InvalidDataError", async () => {
    await expect(
      createTask(_dependencies, { createdBy: 123 as any, task: { name: "Test", isActive: true } })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given an invalid task (null), when calling createTask, then throws InvalidDataError", async () => {
    await expect(
      createTask(_dependencies, { createdBy: "user1", task: null as any })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given a task with missing name, when calling createTask, then throws InvalidDataError", async () => {
    await expect(
      createTask(_dependencies, { createdBy: "user1", task: { isActive: true } as any })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given a task with non-boolean isActive, when calling createTask, then throws InvalidDataError", async () => {
    await expect(
      createTask(_dependencies, { createdBy: "user1", task: { name: "Test", isActive: "yes" as any } })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given valid createdBy and task, when calling createTask, then returns a new Task with id and createdBy", async () => {
    const result = await createTask(_dependencies, {
      createdBy: "user1",
      task: { name: "Test task", isActive: true },
    });

    expect(result).toMatchObject({
      id: expect.any(Number),
      createdBy: "user1",
      name: "Test task",
      isActive: true,
    });
  });
});
