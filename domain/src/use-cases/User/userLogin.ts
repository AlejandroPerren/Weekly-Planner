import { CryptoRepository } from "../../services/CryptoRepository";
import { createUnauthorizedError } from "../../errors/error";
import { UserRepository } from "../../services/UserRepository";

export interface UserLoginDependencies {
  userRepository: UserRepository;
  cryptoRepository: CryptoRepository;
}

export interface UserLoginRequestModel {
  dni: string;
  password: string;
}

export interface UserLoginResponseModel {
  token: string;
}

export async function login(
  { userRepository, cryptoRepository }: UserLoginDependencies,
  { dni, password }: UserLoginRequestModel
): Promise<UserLoginResponseModel> {
  const user = await userRepository.findUserById(dni);

  if (!user) {
    throw createUnauthorizedError("Invalid credentials");
  }

  const isPasswordValid = await cryptoRepository.comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw createUnauthorizedError("Invalid credentials");
  }

  return {
    token: await cryptoRepository.generateJWT(user),
  };
}
