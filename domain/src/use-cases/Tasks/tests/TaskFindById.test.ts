import { beforeEach, describe, expect, it } from "vitest";
import {
  createTaskRepositoryMock,
  MockedTaksRepository,
} from "../../../mocks/Task/Task_Repository_Mock";
import { findTaskById, TaskFindByIdDependencies } from "../TaskFindById";
import { createTaskMock } from "../../../mocks/Task/Task_Mock";

describe("find Task By Id", () => {
  const _mockedTaksRepository: MockedTaksRepository = createTaskRepositoryMock([
    createTaskMock({ id: 0 }),
    createTaskMock({ id: 1 }),
  ]);

  let _dependencies: TaskFindByIdDependencies;

  beforeEach(() => {
    _dependencies = {
      taskRepository: _mockedTaksRepository,
    };
  });

  it("should return error if task not found", async () => {
    const taskId = 1223232; // Unexisted Id
    await expect(
      findTaskById(_dependencies, { id: taskId })
    ).rejects.toMatchObject({
      name: "NotFoundError",
    });
  });

  it("throws error if taskId is in incorrect format", async () => {
    const badId: any = "3"; // force runtime. In runtime you can pass any value
    await expect(
      findTaskById(_dependencies, { id: badId })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
      httpStatus: 400,
    });
  });

  it("should return a Task by id", async () => {
    const taskId = 1;
    const result = await findTaskById(_dependencies, { id: taskId });

    expect(result).toHaveProperty("id", taskId);
  });
});
