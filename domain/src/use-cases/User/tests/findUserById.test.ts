import { beforeEach, describe, expect, it } from "vitest";
import { createUserRepositoryMock } from "../../../mocks/User/User_Repository_Mock";
import { createUserMock } from "../../../mocks/User/User_Mock";
import { findUserByid, UserFindByIdDependencies } from "../findUserById";

describe("find User By Id", () => {
  const _mockedUserRepository = createUserRepositoryMock([createUserMock()]);

  let _dependencies: UserFindByIdDependencies;

  beforeEach(() => {
    _dependencies = {
      userRepository: _mockedUserRepository,
    };
  });

  it("should return error if user not found", async () => {
    const dni = "42425252";
    await expect(
      findUserByid(_dependencies, { dni: dni })
    ).rejects.toMatchObject({
      name: "NotFoundError",
    });
  });

  it("throws error if user dni is in incorrect format", async () => {
    const badDNI: any = 3; // force runtime. In runtime you can pass any value
    await expect(
      findUserByid(_dependencies, { dni: badDNI })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
      httpStatus: 400,
    });
  });

  it("should return a User by DNI", async () => {
    const dni = "50555454";
    const result = await findUserByid(_dependencies, { dni: dni });
    expect(result).toHaveProperty("dni", dni);
  });
});
