import { User } from "../entities/User";

export interface UserRepository {
  findUserById(dni: string): Promise<User | null>;
  createUser(dni: User): Promise<User>;
  findAllUsers(): Promise<User[] | null>;
  updateUser( user: User): Promise<User | null>;
  deleteUser(dni: string): Promise<void>;
}