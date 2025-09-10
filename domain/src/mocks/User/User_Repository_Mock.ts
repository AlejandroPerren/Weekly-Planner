import { User } from "../../entities/User";
import { UserRepository } from "../../services/UserRepository";

export interface MockedUserRepository extends UserRepository {
  users: User[];
}

export function createUserRepositoryMock(
  users: User[] = []
): MockedUserRepository {
  return {
    users,
    findUserById: async function (dni: string): Promise<User | null> {
      const user = this.users.find((user) => user.dni === dni);
      return user || null;
    },
    createUser: async function (user: User): Promise<User> {
      const newUser: User = {
        ...user,
      };
      this.users.push(newUser);
      return newUser;
    },
    updateUser: async function ( user: User): Promise<User | null> {
      const index = this.users.findIndex((u) => u.dni === user.dni);
      if (index === -1) {
        return null;
      }
      this.users[index] = { ...this.users[index], ...user };
      return this.users[index];
    },
    deleteUser: async function (dni: string): Promise<void> {
      const index = this.users.findIndex((user) => user.dni === dni);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
    findAllUsers: async function (): Promise<User[] | null> {
      return this.users;
    },
  };
}
