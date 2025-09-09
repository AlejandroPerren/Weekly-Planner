import { User } from "entities/User";
import {
  createInvalidDataError,
  createNotFoundError,
  NotFoundError,
} from "errors/error";
import { UserRepository } from "services/UserRepository";

export interface UserFindByIdDependencies {
  userRepository: UserRepository;
}

export interface FindUserByIdRequestModel {
  dni: string;
}

export async function findUserByid(
  { userRepository }: UserFindByIdDependencies,
  { dni }: FindUserByIdRequestModel
): Promise<User | NotFoundError> {
  if (typeof dni !== "string") {
    throw createInvalidDataError("User dni must be a string");
  }
  const user = await userRepository.findUserById(dni);
  if (!user) throw createNotFoundError("User not Found");
  return user;
}
