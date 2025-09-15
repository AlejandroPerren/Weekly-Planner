import { login } from "@domain/use-cases/User/userLogin";
import { cryptoService } from "../services/crypto.service";
import { userService } from "../services/user.service";
import { Request, Response } from "express";
import { createInternalServerError } from "@domain/errors/error";
import { isAppError } from "../utils/createErrorResponse";

export function authController() {
  return {
    login: async (req: Request, res: Response) => {
      const { dni, password } = req.body;
      try {
        const resp = await login(
          {
            userRepository: userService(),
            cryptoRepository: cryptoService(),
          },
          { dni, password }
        );

        return res.status(200).json({
          ok: true,
          data: {
            token: resp instanceof Error ? "" : resp.token,
          },
          message: "Inicio de sesión exitoso",
        });
      } catch (e) {
        const error = isAppError(e)
          ? e
          : createInternalServerError("Ups, hubo un error al iniciar sesión");

        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },
  };
}
