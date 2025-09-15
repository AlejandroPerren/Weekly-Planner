import { beforeEach, describe, expect, test } from "vitest";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { deleteUser, DeleteUserDependencies } from "../deleteUser";
import { createUserMock } from "../../../mocks/User/User_Mock";
import { createNotFoundError } from "../../../errors/error";

describe("Delete user", () => {
  const _mockedUserRepository: MockedUserRepository = createUserRepositoryMock([
    createUserMock({ dni: "5000000" }),
    createUserMock({ dni: "4000000" }),
  ]);

  let _dependencies: DeleteUserDependencies;

  beforeEach(() => {
    _dependencies = {
      userRepository: _mockedUserRepository,
    };
  });

  test("should get user by dni", async () => {
    const userId = "2000000";
    const result = await deleteUser(_dependencies, { dni: userId });
    expect(result).toEqual(createNotFoundError("User not found"));
  });

  test("should throw error when user id does not exist", async () => {
    const userId = "non-exist-id";
    const result = await deleteUser(_dependencies, {
      dni: userId,
    });
    expect(result).toEqual(createNotFoundError("User not found"));
  });
});
