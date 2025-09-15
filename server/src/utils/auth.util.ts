import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(JWT_SECRET === undefined){
  throw console.error("No existe key token");
}

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
};

export const comparePasswords = (plain: string, hashed: string) =>
  bcrypt.compare(plain, hashed);

export const generateToken = (userId: number, role: string) =>
  jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1d" });