import { User } from "../../entities/User";
import { UserRepository } from "../../services/UserRepository";

export interface UserFindAllDependencies {
  userRepository: UserRepository;
}

export async function findAllUsers(
  { userRepository }: UserFindAllDependencies
): Promise<User[]> {
  const users = await userRepository.findAllUsers();
  return users ?? [];
}
