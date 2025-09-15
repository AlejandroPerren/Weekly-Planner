import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { AppError, createInternalServerError } from "@domain/errors/error";
import { comparePasswords, generateToken } from "../utils/auth.util";

export function authController () {
    return {
        loginUser: async (req: Request, res: Response)=> {
           try {
        const { email, password } = req.body;

        if (!email || !password) {
          const error = createBadRequestError(
            "Email y contraseña son obligatorios"
          );
          return res.status(400).json({ ok: false, message: error.message });
        }

        const user = await service.findByEmail(email);
        if (!user) {
          return res
            .status(401)
            .json({ ok: false, message: "Credenciales inválidas" });
        }

        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword) {
          return res
            .status(401)
            .json({ ok: false, message: "Credenciales inválidas" });
        }

        const token = generateToken(user.id, user.role);

        return res.status(200).json({
          ok: true,
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          },
        });
      } catch (error) {
        const err =
          createInternalServerError("Error al loguear usuario") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    }
}