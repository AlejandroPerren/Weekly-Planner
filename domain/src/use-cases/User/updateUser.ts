import { User } from "../../entities/User";
import { createInvalidDataError, createNotFoundError, NotFoundError } from "../../errors/error";
import { UserRepository } from "../../services/UserRepository";
export interface UserUpdateDependencies {
  userRepository: UserRepository;
}

export interface UserUpdateRequestModel {
  userToUpdate: User;
}

export async function updateUser(
  { userRepository }: UserUpdateDependencies,
  { userToUpdate }: UserUpdateRequestModel
): Promise<Partial<User> | NotFoundError> {
  const user = await userRepository.findUserById(userToUpdate.dni);
  if (!user) return createNotFoundError("User not found");
  const updatedBrand = await userRepository.updateUser(userToUpdate);

  return updatedBrand;
}