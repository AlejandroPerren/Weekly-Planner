import { User } from "../entities/User";

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  findAllUser(): Promise<User[] | null>;
  updateUser(id: number, user: User): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
}