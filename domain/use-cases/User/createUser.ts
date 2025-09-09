import { User } from "../../entities/User";
import { createInvalidDataError } from "../../errors/error";
import { UserRepository } from "../../services/UserRepository";

export interface UserCreateDependencies {
  userRepository: UserRepository;
}

export interface CreateUserRequestModel {
  user: User;
}

export async function createUser(
  { userRepository }: UserCreateDependencies,
  { user }: CreateUserRequestModel
): Promise<User> {
  if (!user || typeof user !== "object") {
    throw createInvalidDataError("User must be a valid object");
  }

  if (!user.name || typeof user.name !== "string") {
    throw createInvalidDataError("User name must be a string");
  }

  if (!user.dni || typeof user.dni !== "string") {
    throw createInvalidDataError("User dni must be a string");
  }

  if (!user.password || typeof user.password !== "string") {
    throw createInvalidDataError("User password must be a string");
  }

  if (!user.email || typeof user.email !== "string") {
    throw createInvalidDataError("User email must be a string");
  }

  return await userRepository.createUser(user);
}
