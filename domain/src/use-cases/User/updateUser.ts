import { User } from "../../entities/User";
import { createInvalidDataError, createNotFoundError, NotFoundError } from "../../errors/error";
import { UserRepository } from "../../services/UserRepository";

export interface UserUpdateDependencies {
  userRepository: UserRepository;
}

export interface UpdateUserRequestModel {
  dni: string;
  user: User;
}

export async function updateUser(
  { userRepository }: UserUpdateDependencies,
  { dni, user }: UpdateUserRequestModel
): Promise<User> {
  if (!dni || typeof dni !== "string") {
    throw createInvalidDataError("User dni must be a string");
  }

  if (!user || typeof user !== "object") {
    throw createInvalidDataError("User must be a valid object");
  }

  const updated = await userRepository.updateUser(user);

  if (!updated) {
    throw createNotFoundError("User not found to update");
  }

  return updated;
}
