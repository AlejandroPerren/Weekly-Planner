import { createInvalidDataError, createNotFoundError, NotFoundError } from "../../errors/error";
import { UserRepository } from "../../services/UserRepository";

export interface DeleteUserDependencies {
  userRepository: UserRepository;
}

export interface DeleteUserRequestModel {
  dni: string;
}

export async function deleteUser(
  { userRepository }: DeleteUserDependencies,
  { dni }: DeleteUserRequestModel
): Promise<void | NotFoundError > {
  const user = await userRepository.findUserById(dni);
  if (!user) return createNotFoundError("User not found");
  await userRepository.deleteUser(dni);
  return
}