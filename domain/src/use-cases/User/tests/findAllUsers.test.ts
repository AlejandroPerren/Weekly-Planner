import { beforeEach, describe, expect, it } from "vitest";
import {
  createUserRepositoryMock,
  MockedUserRepository,
} from "../../../mocks/User/User_Repository_Mock";
import { findAllUsers, UserFindAllDependencies } from "../findAllUsers";
import { createUserMock } from "../../../mocks/User/User_Mock";

describe("findAllUsers", () => {
  let _mockedUserRepository: MockedUserRepository;
  let _dependencies: UserFindAllDependencies;

  beforeEach(() => {
    _mockedUserRepository = createUserRepositoryMock([
      createUserMock({ dni: "1231234", name: "User1" }),
      createUserMock({ dni: "4561235", name: "User2" }),
    ]);
    _dependencies = { userRepository: _mockedUserRepository };
  });

  it("given no users in repository, when calling findAllUsers, then returns empty array", async () => {
    const emptyRepo = createUserRepositoryMock([]);
    const emptyDeps = { userRepository: emptyRepo };

    const result = await findAllUsers(emptyDeps);
    expect(result).toEqual([]);
  });

  it("given users in repository, when calling findAllUsers, then returns all users", async () => {
    const result = await findAllUsers(_dependencies);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ dni: "1231234", name: "User1" }),
        expect.objectContaining({ dni: "4561235", name: "User2" }),
      ])
    );
  });
});
