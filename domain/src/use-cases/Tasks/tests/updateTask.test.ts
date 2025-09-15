import { beforeEach, describe, expect, it } from "vitest";
import {
  createTaskRepositoryMock,
  MockedTaksRepository,
} from "../../../mocks/Task/Task_Repository_Mock";
import { updateTask, TaskUpdateDependencies } from "../updateTask";
import { createTaskMock } from "../../../mocks/Task/Task_Mock";

describe("updateTask", () => {
  let _mockedTaskRepository: MockedTaksRepository;
  let _dependencies: TaskUpdateDependencies;

  beforeEach(() => {
    _mockedTaskRepository = createTaskRepositoryMock([
      createTaskMock({ id: 1, createdBy: "user1", name: "Old Task" }),
    ]);
    _dependencies = { taskRepository: _mockedTaskRepository };
  });

  it("given invalid id (string), when calling updateTask, then throws InvalidDataError", async () => {
    await expect(
      updateTask(_dependencies, { id: "a" as any, task: createTaskMock({ id: 1 }) })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given an unexisting id, when calling updateTask, then throws NotFoundError", async () => {
    await expect(
      updateTask(_dependencies, {
        id: 999,
        task: createTaskMock({ id: 999, createdBy: "userX" }),
      })
    ).rejects.toMatchObject({
      name: "NotFoundError",
    });
  });

  it("given a valid id and task, when calling updateTask, then returns the updated task", async () => {
    const updated = await updateTask(_dependencies, {
      id: 1,
      task: { id: 1, createdBy: "user1", name: "Updated Task", isActive: true },
    });

    expect(updated).toMatchObject({
      id: 1,
      name: "Updated Task",
      isActive: true,
    });
  });
});
