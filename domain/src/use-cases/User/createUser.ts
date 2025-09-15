import { User } from "../../entities/User";
import { createInvalidDataError, InvalidDataError } from "../../errors/error";
import { UserRepository } from "../../services/UserRepository";
import { CryptoRepository } from "../../services/CryptoRepository";

export interface UserCreateDependencies {
  userRepository: UserRepository;
  cryptoRepository: CryptoRepository;
}

export interface UserCreateRequestModel {
  dni: string;
  email: string;
  password: string;
  name: string;
}

export async function userCreate(
  { userRepository, cryptoRepository }: UserCreateDependencies,
  { dni, email, password, name }: UserCreateRequestModel
): Promise<User | InvalidDataError> {
  // Validaciones
  const hasErrors = validateData(dni, email, password, name);
  if (hasErrors) throw hasErrors;

  // Chequear si el dni ya existe
  const existingDni = await userRepository.findUserById(dni);
  if (existingDni) throw createInvalidDataError("DNI already in use");

  // Chequear si el email ya existe
  if ("findUserByEmail" in userRepository && userRepository.findUserByEmail) {
    const existingEmail = await userRepository.findUserByEmail(email);
    if (existingEmail) throw createInvalidDataError("Email already in use");
  }

  // Hashear la contraseña
  const hashedPassword = await cryptoRepository.hashPassword(password);

  // Crear el nuevo usuario
  const user: User = {
    dni,
    email,
    password: hashedPassword,
    name,
  };

  return await userRepository.createUser(user);
}

function validateData(
  dni: string,
  email: string,
  password: string,
  name: string
): InvalidDataError | void {
  if (!dni || dni.trim() === "") {
    return createInvalidDataError("DNI must not be empty");
  }
  if (!email || email.trim() === "") {
    return createInvalidDataError("Email must be not empty");
  }
  if (!password || password.trim() === "") {
    return createInvalidDataError("Password must be not empty");
  }
  if (!name || name.trim() === "") {
    return createInvalidDataError("Name must be not empty");
  }
}
