import { beforeEach, describe, expect, it } from "vitest";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { updateUser, UserUpdateDependencies } from "../updateUser";
import { createUserMock } from "../../../mocks/User/User_Mock";

describe("updateUser", () => {
  let _mockedUserRepository: MockedUserRepository;
  let _dependencies: UserUpdateDependencies;

  beforeEach(() => {
    _mockedUserRepository = createUserRepositoryMock([
      createUserMock({ dni: "123", name: "Old User" }),
    ]);
    _dependencies = { userRepository: _mockedUserRepository };
  });

  it("given invalid dni (number), when calling updateUser, then throws InvalidDataError", async () => {
    await expect(
      updateUser(_dependencies, { dni: 123 as any, user: createUserMock({ dni: "123" }) })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given an unexisting dni, when calling updateUser, then throws NotFoundError", async () => {
    await expect(
      updateUser(_dependencies, {
        dni: "999",
        user: createUserMock({ dni: "999", name: "UserX" }),
      })
    ).rejects.toMatchObject({
      name: "NotFoundError",
    });
  });

  it("given a valid dni and user, when calling updateUser, then returns the updated user", async () => {
    const updated = await updateUser(_dependencies, {
      dni: "123",
      user: { dni: "123", name: "Updated User", password: "1234", email: "a@b.com" },
    });

    expect(updated).toMatchObject({
      dni: "123",
      name: "Updated User",
    });
  });
});
