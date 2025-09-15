import { beforeAll, describe, expect, test } from "vitest";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import {
  login,
  UserLoginDependencies,
  UserLoginResponseModel,
} from "../userLogin";
import { createUserMock } from "../../../mocks/User/User_Mock";
import { createCryptoRepositoryMock } from "../../../mocks/Crypto/Crypto_Repository_Mock";


describe("Login & auth user", () => {
  const _mockedUserRepository: MockedUserRepository = createUserRepositoryMock([
    createUserMock({
      dni: "4436424",
      name: "stored-name",
      email: "stored@email.com",
      password: "[HASHED]stored-password",
    }),
  ]);

  let _dependencies: UserLoginDependencies;

  beforeAll(async () => {
    _dependencies = {
      userRepository: _mockedUserRepository,
      cryptoRepository: createCryptoRepositoryMock(),
    };
  });

  test("With a valid dni not stored, fails with error 'INVALID_CREDENTIALS'", async () => {
    await expect(
      login(_dependencies, {
        dni: "12345467444",
        password: "any password",
      })
    ).rejects.toThrow("Invalid credentials");
  });

  test("With an existent dni and an invalid password, fails with error 'INVALID_CREDENTIALS'", async () => {
    await expect(
      login(_dependencies, {
        dni: "4436424",
        password: "invalid password",
      })
    ).rejects.toThrow("Invalid credentials");
  });

  test("With valid data, returns a valid token", async () => {
    const result = await login(_dependencies, {
      dni: "4436424",
      password: "stored-password",
    });

    expect(result).toHaveProperty("token");

    const JWT = await _dependencies.cryptoRepository.generateJWT(
      _mockedUserRepository.users[0]
    );

    expect((result as UserLoginResponseModel).token).toStrictEqual(JWT);

    expect(
      _dependencies.cryptoRepository.validateToken(
        (result as UserLoginResponseModel).token
      )
    ).toStrictEqual(_dependencies.cryptoRepository.validateToken(JWT));
  });
});
