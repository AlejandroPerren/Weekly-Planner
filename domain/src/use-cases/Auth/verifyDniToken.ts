import {
  InvalidDataError,
  NotFoundError,
  ConflictError,
  createInvalidDataError,
  createNotFoundError,
  createConflictError,
} from "src/errors/error";
import { UserRepository } from "src/services/UserRepository";
import { VerificationTokenRepository } from "src/services/VerificationTokenRepository";

export interface VerifyDNITokenDependencies {
  userRepository: UserRepository;
  verificationTokenRepository: VerificationTokenRepository;
}

export interface VerifyDNITokenRequest {
  token: string;
}

export interface VerifyDNITokenResponse {
  success: boolean;
  message: string;
}

export const verifyDNIToken = async (
  { userRepository, verificationTokenRepository }: VerifyDNITokenDependencies,
  { token }: VerifyDNITokenRequest
): Promise<
  VerifyDNITokenResponse | InvalidDataError | NotFoundError | ConflictError
> => {
  if (!token || token.trim() === "") {
    throw createInvalidDataError("Token is required");
  }

  const verificationToken =
    await verificationTokenRepository.findVerificationToken(token);

  if (!verificationToken) {
    throw createNotFoundError("Invalid or expired token");
  }

  const now = new Date();
  if (verificationToken.expiresAt < now) {
    throw createConflictError("Token has expired");
  }

  const user = await userRepository.findUserById(verificationToken.DNI);
  if (!user) {
    throw createNotFoundError("User associated with the token not found");
  }

  await userRepository.updateUser(user);

  await verificationTokenRepository.deleteVerificationToken(token);

  return {
    success: true,
    message: "DNI successfully verified",
  };
};
