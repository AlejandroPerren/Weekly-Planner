import { User } from "../entities/User";

export interface UserRepository {
  findUserById(dni: string): Promise<User | null>;
  createUser(dni: User): Promise<User>;
  findAllUsers(): Promise<User[] | null>;
  updateUser( user: User): Promise<User>;
  deleteUser(dni: string): Promise<void>;
  findUserByEmail(email: string): Promise<User | null>;
}