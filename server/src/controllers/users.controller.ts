import { Request, Response } from "express";
import { isAppError } from "../utils/createErrorResponse";
import { createInternalServerError } from "@domain/errors/error";
import {
  userCreate,
  UserCreateRequestModel,
} from "@domain/use-cases/User/createUser";
import { userService } from "../services/user.service";
import { cryptoService } from "../services/crypto.service";
import { findUserByid } from "@domain/use-cases/User/findUserById";
import { findAllUsers } from "@domain/use-cases/User/findAllUsers";
import { updateUser } from "@domain/use-cases/User/updateUser";
import { deleteUser } from "@domain/use-cases/User/deleteUser";

export function userController() {
  return {
    registerNewUser: async (req: Request, res: Response) => {
      try {
        const { email, password, name, dni }: UserCreateRequestModel = req.body;
        const user = await userCreate(
          {
            userRepository: userService(),
            cryptoRepository: cryptoService(),
          },
          { email, password, name, dni }
        );
        res.status(200).json({
          ok: true,
          data: user,
          message: "Usuario registrado con éxito",
        });
      } catch (e) {
        console.log(e)
        const error = isAppError(e)
        
          ? e
          : createInternalServerError(
              "Ups, hubo un error al registrar al usuario"
            );
            
        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },

    getUserById: async (req: Request, res: Response) => {
      try {
        const { dni } = req.params;
        const user = await findUserByid(
          { userRepository: userService() },
          { dni }
        );

        return res.status(200).json({
          ok: true,
          data: user,
          message: "Perfil de usuario",
        });
      } catch (e) {
        const error = isAppError(e)
          ? e
          : createInternalServerError(
              "Ups, hubo un error al obtener el usuario"
            );

        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },

    findAllUsers: async (req: Request, res: Response) => {
      try {
        const users = await findAllUsers({ userRepository: userService() });

        return res.status(200).json({
          ok: true,
          data: users.map((user) => ({
            ...user,
            url: `${req.protocol}://${req.get("host")}/users/${user.dni}`,
          })),
          message: "Lista de usuarios",
        });
      } catch (e) {
        const error = isAppError(e)
          ? e
          : createInternalServerError(
              "Ups, hubo un error al obtener los usuarios"
            );

        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },

    updateUser: async (req: Request, res: Response) => {
      try {
        const { dni } = req.params;
        const { name, email, password } = req.body;

        const updatedUser = await updateUser(
          { userRepository: userService() },
          { userToUpdate: { dni, name, email, password } }
        );

        return res.status(200).json({
          ok: true,
          data: updatedUser,
          message: "Usuario actualizado con éxito",
        });
      } catch (e) {
        const error = isAppError(e)
          ? e
          : createInternalServerError(
              "Ups, hubo un error al actualizar el usuario"
            );

        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },

    deleteUser: async (req: Request, res: Response) => {
      try {
        const { dni } = req.params;

        await deleteUser({ userRepository: userService() }, { dni });

        return res.status(200).json({
          ok: true,
          message: "Usuario eliminado con éxito",
        });
      } catch (e) {
        const error = isAppError(e)
          ? e
          : createInternalServerError(
              "Ups, hubo un error al eliminar el usuario"
            );

        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },
  };
}
