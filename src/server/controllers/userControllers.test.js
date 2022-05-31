const { findOne, create } = require("../../database/models/User");
const { registerUser } = require("./userControllers");

const mockUser = {
  name: "Kawaii Neko",
  username: "kawaiiNeko",
  password: "kawaiiNeko",
};
const mockToken = "uwuwuwuwu";

jest.mock("../../database/models/User", () => ({
  ...jest.requireActual("../../database/models/User"),
  create: jest.fn(),
  findOne: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockToken,
}));

describe("Given the registerUser controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const req = {
    body: {
      name: "Kawaii Neko",
      username: "kawaiiNeko",
      password: "kawaiiNeko",
      image: "",
    },
  };

  describe("When it receives a request with an unexisting user and a response", () => {
    test("Then it should call res' status and json methods with 201 and the created user", async () => {
      findOne.mockImplementation(() => undefined);
      create.mockImplementation(() => mockUser);
      const expectedStatus = 201;
      const expectedBody = { token: mockToken };

      await registerUser(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it receives a request with an existing user and a response", () => {
    test("Then it should call next function with an error 409 and 'User already exists'", async () => {
      findOne.mockImplementation(() => mockUser);
      const expectedError = new Error();
      expectedError.customMessage = "User already exists";
      expectedError.statusCode = 400;
      const next = jest.fn();

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an unexisting user and a response but can't be created", () => {
    test("Then it should call next function with an error 409 and 'Couldn't create user'", async () => {
      findOne.mockImplementation(() => undefined);
      create.mockImplementation(() => {
        throw new Error();
      });
      const expectedError = new Error();
      expectedError.customMessage = "Couldn't create user";
      expectedError.statusCode = 409;
      const next = jest.fn();

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
