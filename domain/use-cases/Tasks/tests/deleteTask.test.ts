import { beforeEach, describe, expect, it } from "vitest";
import {
  createTaskRepositoryMock,
  MockedTaksRepository,
} from "../../../mocks/Task/Task_Repository_Mock";
import { deleteTask, TaskDeleteDependencies } from "../deleteTask";
import { createTaskMock } from "../../../mocks/Task/Task_Mock";

describe("deleteTask", () => {
  let _mockedTaskRepository: MockedTaksRepository;
  let _dependencies: TaskDeleteDependencies;

  beforeEach(() => {
    _mockedTaskRepository = createTaskRepositoryMock([
      createTaskMock({ id: 1, createdBy: "user1" }),
    ]);
    _dependencies = { taskRepository: _mockedTaskRepository };
  });

  it("given an invalid id (string), when calling deleteTask, then throws InvalidDataError", async () => {
    await expect(
      deleteTask(_dependencies, { id: "a" as any })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given an unexisting id, when calling deleteTask, then throws NotFoundError", async () => {
    await expect(
      deleteTask(_dependencies, { id: 999 })
    ).rejects.toMatchObject({
      name: "NotFoundError",
    });
  });

  it("given a valid id, when calling deleteTask, then removes the task", async () => {
    await deleteTask(_dependencies, { id: 1 });

    const deleted = await _mockedTaskRepository.findById(1);
    expect(deleted).toBeNull();
  });
});
