import { User } from "entities/User";

export function createUserMock(overrides?: Partial<User>): User {
  return {
    name: "Richard",
    dni: "50555454",
    password: "Password",
    email: "helloRichard@gmail.com",
    ...overrides, 
  };
}
