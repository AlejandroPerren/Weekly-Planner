import { beforeEach, describe, expect, it } from "vitest";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { deleteUser, UserDeleteDependencies } from "../deleteUser";
import { createUserMock } from "../../../mocks/User/User_Mock";

describe("deleteUser", () => {
  let _mockedUserRepository: MockedUserRepository;
  let _dependencies: UserDeleteDependencies;

  beforeEach(() => {
    _mockedUserRepository = createUserRepositoryMock([
      createUserMock({ dni: "12312312", name: "User1" }),
    ]);
    _dependencies = { userRepository: _mockedUserRepository };
  });

  it("given an invalid dni (number), when calling deleteUser, then throws InvalidDataError", async () => {
    await expect(
      deleteUser(_dependencies, { dni: 123 as any })
    ).rejects.toMatchObject({
      name: "InvalidDataError",
    });
  });

  it("given an unexisting dni, when calling deleteUser, then throws NotFoundError", async () => {
    await expect(
      deleteUser(_dependencies, { dni: "999" })
    ).rejects.toMatchObject({
      name: "NotFoundError",
    });
  });

  it("given a valid dni, when calling deleteUser, then removes the user", async () => {
    await deleteUser(_dependencies, { dni: "12312312" }); 

    const deleted = await _mockedUserRepository.findUserById("12312312");
    expect(deleted).toBeNull();
  });
});
