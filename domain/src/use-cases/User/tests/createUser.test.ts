import { describe, test, expect, beforeEach } from "vitest";
import { User } from "../../../entities/User";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { createCryptoRepositoryMock } from "../../../mocks/Crypto/Crypto_Repository_Mock";
import {
  userCreate,
  UserCreateDependencies,
  UserCreateRequestModel,
} from "../createUser";

describe("Create new user", () => {
  const existingUser: User = {
    dni: "12345678",
    password: "12345678",
    email: "existing@user.com",
    name: "Existing User",
  };

  const _mockedUserRepository: MockedUserRepository = createUserRepositoryMock([
    existingUser,
  ]);

  let _dependencies: UserCreateDependencies;

  beforeEach(() => {
    _dependencies = {
      userRepository: _mockedUserRepository,
      cryptoRepository: createCryptoRepositoryMock(),
    };
  });

  test("With an email already in use, fails with InvalidData", async () => {
    const payload: UserCreateRequestModel = {
      dni: "87654321",
      email: "existing@user.com",
      password: "12345678",
      name: "Test User",
    };
    await expect(userCreate(_dependencies, payload)).rejects.toThrow(
      "Email already in use"
    );
  });

  test("With an empty email, fails with InvalidData", async () => {
    const payload: UserCreateRequestModel = {
      dni: "87654321",
      email: "",
      password: "12345678",
      name: "Test User",
    };
    await expect(userCreate(_dependencies, payload)).rejects.toThrow(
      "Email must be not empty"
    );
  });

  test("With an empty password, fails with InvalidData", async () => {
    const payload: UserCreateRequestModel = {
      dni: "87654321",
      email: "valid@email.com",
      password: "",
      name: "Test User",
    };
    await expect(userCreate(_dependencies, payload)).rejects.toThrow(
      "Password must be not empty"
    );
  });

  test("With an empty name, fails with InvalidData", async () => {
    const payload: UserCreateRequestModel = {
      dni: "87654321",
      email: "valid@email.com",
      password: "12345678",
      name: "",
    };

    await expect(userCreate(_dependencies, payload)).rejects.toThrow(
      "Name must be not empty"
    );
  });

  test("With valid data, registers the user successfully", async () => {
    const payload: UserCreateRequestModel = {
      dni: "87654321",
      email: "valid@email.com",
      password: "12345678",
      name: "Test User",
    };

    const result = await userCreate(_dependencies, payload);
    const user = await _mockedUserRepository.findUserById(payload.dni);

    expect(user).not.toBeNull();
    expect(result).toEqual(user);
    if (user?.password) {
      expect(
        await _dependencies.cryptoRepository.comparePassword(
          payload.password,
          user.password
        )
      ).toBe(true);
    }
  });
});
