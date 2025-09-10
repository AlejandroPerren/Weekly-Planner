import { beforeEach, describe, expect, it } from "vitest";
import {
  createTaskRepositoryMock,
  MockedTaksRepository,
} from "../../../mocks/Task/Task_Repository_Mock";
import {
  findAllTaskByCreatorId,
  TaskFindAllByCreatorIdDependencies,
} from "../TaskFindAllByCreatorId";
import { createTaskMock } from "../../../mocks/Task/Task_Mock";

describe("findAllTaskByCreatorId", () => {
  let _mockedTaskRepository: MockedTaksRepository;
  let _dependencies: TaskFindAllByCreatorIdDependencies;

  beforeEach(() => {
    _mockedTaskRepository = createTaskRepositoryMock([
      createTaskMock({ id: 1, createdBy: "user1" }),
      createTaskMock({ id: 2, createdBy: "user1" }),
      createTaskMock({ id: 3, createdBy: "user2" }),
    ]);
    _dependencies = { taskRepository: _mockedTaskRepository };
  });

  it("given invalid creatorId (number), when calling findAllTaskByCreatorId, then throws InvalidDataError", async () => {
    await expect(
      findAllTaskByCreatorId(_dependencies, { creatorId: 123 as any })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given a creatorId with no tasks, when calling findAllTaskByCreatorId, then throws NotFoundError", async () => {
    await expect(
      findAllTaskByCreatorId(_dependencies, { creatorId: "unknown" })
    ).rejects.toMatchObject({
      name: "NotFoundError",
    });
  });

  it("given a creatorId with tasks, when calling findAllTaskByCreatorId, then returns a list of tasks", async () => {
    const result = await findAllTaskByCreatorId(_dependencies, { creatorId: "user1" });

    expect(result).toHaveLength(2);
    expect(result.every(task => task.createdBy === "user1")).toBe(true);
  });
});
