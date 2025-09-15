import { createInvalidDataError, createNotFoundError } from "../../errors/error";
import { UserRepository } from "../../services/UserRepository";

export interface UserDeleteDependencies {
  userRepository: UserRepository;
}

export interface DeleteUserRequestModel {
  dni: string;
}

export async function deleteUser(
  { userRepository }: UserDeleteDependencies,
  { dni }: DeleteUserRequestModel
): Promise<void> {
  if (typeof dni !== "string") {
    throw createInvalidDataError("DNI must be a string");
  }
  const existingUser = await userRepository.findUserById(dni);
  if (!existingUser) {
    throw createNotFoundError("User not found");
  }
  await userRepository.deleteUser(dni);
}
