import { UserRepository } from "@domain/services/UserRepository";
import { User as UserModel } from "../database/models/User";
import { User } from "@domain/entities/User";
import {
  createBadRequestError,
  createNotFoundError,
} from "@domain/errors/error";

export function userService(): UserRepository {
  const _mapToUserResponseDTO = (user: UserModel): User => {
    return {
      dni: user.dni,
      name: user.name,
      password: user.password,
      email: user.email,
    };
  };

  return {
    findAllUsers: async function () {
      const users = await UserModel.findAll();
      return users.map((user) => _mapToUserResponseDTO(user));
    },
    findUserById: async function (dni: string) {
      const user = await UserModel.findByPk(dni);
      return user ? _mapToUserResponseDTO(user) : null;
    },
    createUser: async function (user: User) {
      const newUser = await UserModel.create(user);
      return _mapToUserResponseDTO(newUser);
    },
    updateUser: async function (user: User) {
      const userToUpdate = await UserModel.findByPk(user.dni);
      if (!userToUpdate) {
        throw createNotFoundError("User Dni not exist" + user.dni);
      }
      userToUpdate.update(user);
      const userUpdated = await userToUpdate.save();
      return _mapToUserResponseDTO(userUpdated);
    },
    deleteUser: async function (dni: string) {
      const userToDelete = await UserModel.findByPk(dni);
      if (!userToDelete) {
        throw createNotFoundError("User Dni not exist" + dni);
      }
      await userToDelete.destroy();
    },
  };
}
