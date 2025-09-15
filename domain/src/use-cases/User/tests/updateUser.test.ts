import { beforeEach, describe, expect, test } from "vitest";

import { createNotFoundError } from "../../../errors/error";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { createUserMock } from "../../../mocks/User/User_Mock";
import { updateUser, UserUpdateDependencies } from "../updateUser";

describe("Update User", () => {
  const _mockedUserRepository: MockedUserRepository = createUserRepositoryMock([
    createUserMock({ dni: "5000000", name: "any-name" }),
    createUserMock({ dni: "4000000" }),
  ]);

  let _dependencies: UserUpdateDependencies;

  beforeEach(() => {
    _dependencies = {
      userRepository: _mockedUserRepository,
    };
  });

  test("should update a user", async () => {
    const userToUpdate = createUserMock({
      dni: "5000000",
      name: "update-name",
      email: "update-email",
    });
    const result = await updateUser(_dependencies, { userToUpdate });

    expect(result).toHaveProperty("name", userToUpdate.name);
    expect(result).toHaveProperty("email", userToUpdate.email);
  });

  test("should throw error when user id does not exist", async () => {
    const userToUpdate = createUserMock({
      dni: "2000000",
      name: "update-name",
    });
    const result = await updateUser(_dependencies, {
      userToUpdate,
    });
    expect(result).toEqual(createNotFoundError("User not found"));
  });
});
