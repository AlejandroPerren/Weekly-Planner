import { beforeEach, describe, expect, it } from "vitest";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { createUser, UserCreateDependencies } from "../createUser";
import { createUserMock } from "../../../mocks/User/User_Mock";

describe("createUser", () => {
  let _mockedUserRepository: MockedUserRepository;
  let _dependencies: UserCreateDependencies;

  beforeEach(() => {
    _mockedUserRepository = createUserRepositoryMock([]);
    _dependencies = { userRepository: _mockedUserRepository };
  });

  it("given an invalid user (null), when calling createUser, then throws InvalidDataError", async () => {
    await expect(
      createUser(_dependencies, { user: null as any })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given a user with missing name, when calling createUser, then throws InvalidDataError", async () => {
    await expect(
      createUser(_dependencies, { user: { dni: "123", password: "1234", email: "test@test.com" } as any })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given a user with non-string dni, when calling createUser, then throws InvalidDataError", async () => {
    await expect(
      createUser(_dependencies, { user: { name: "Test", dni: 123 as any, password: "1234", email: "a@b.com" } })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given valid user data, when calling createUser, then returns the created user", async () => {
    const newUser = createUserMock({ dni: "123", name: "User Test" });
    const result = await createUser(_dependencies, { user: newUser });

    expect(result).toMatchObject({
      dni: "123",
      name: "User Test",
      password: expect.any(String),
      email: expect.any(String),
    });
  });
});


