import { describe, test, expect, beforeEach } from "vitest";
import {
  verifyDNIToken,
  VerifyDNITokenDependencies,
  VerifyDNITokenRequest,
} from "../verifyDniToken";
import { createUserMock } from "../../../mocks/User/User_Mock";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { createVerificationTokenRepositoryMock } from "../../../mocks/Crypto/VerificationToken_Repository_Mock";
import {
  createConflictError,
  createInvalidDataError,
  createNotFoundError,
} from "../../../errors/error";

describe("verifyDNIToken", () => {
  const _mockedUserRepository: MockedUserRepository = createUserRepositoryMock([
    createUserMock({ dni: "12345678" }),
    createUserMock({ dni: "87654321" }),
  ]);
  const _mockedVerificationTokenRepository =
    createVerificationTokenRepositoryMock();

  let _dependencies: VerifyDNITokenDependencies;

  beforeEach(() => {
    _dependencies = {
      userRepository: _mockedUserRepository,
      verificationTokenRepository: _mockedVerificationTokenRepository,
    };
  });

  test("should return an InvalidDataError if token is empty", async () => {
    const request: VerifyDNITokenRequest = { token: "" };
    await expect(verifyDNIToken(_dependencies, request)).rejects.toThrow(
      "Token is required"
    );
  });

  test("should return a NotFoundError if the token does not exist", async () => {
    const request = { token: "invalid-token" };
    await expect(verifyDNIToken(_dependencies, request)).rejects.toThrow(
      "Invalid or expired token"
    );
  });

  test("should return a ConflictError if the token has expired", async () => {
    const expiredToken = "expired-token";
    const dni = "12345678";
    const expiresAt = new Date(Date.now() - 100000);

    await _mockedVerificationTokenRepository.saveVerificationToken(
      dni,
      expiredToken,
      expiresAt
    );

    const request = { token: expiredToken };

    await expect(verifyDNIToken(_dependencies, request)).rejects.toThrow(
      "Token has expired"
    );
  });

  test("should return a NotFoundError if the user associated with the token is not found", async () => {
    const token = "valid-token-789";
    const nonExistentDNI = "99999999";

    _mockedVerificationTokenRepository.tokens.push({
      DNI: nonExistentDNI,
      token,
      expiresAt: new Date(Date.now() + 100000),
    });

    const request = { token };

    await expect(verifyDNIToken(_dependencies, request)).rejects.toThrow(
      "User associated with the token not found"
    );
  });
});
