require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const User = require("../../database/models/User");
const { mockUsers, mockUser } = require("../../mocks/userMocks");
const app = require("..");
const connectDB = require("../../database");

let users;
const testDB = process.env.MONGODB_STRING_TEST;

beforeAll(async () => {
  await connectDB(testDB);
});

beforeEach(async () => {
  users = mockUsers;
  await User.create(users[0]);
  await User.create(users[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Given the /users/register endpoint", () => {
  describe("When a POST request is made with an unexistant user", () => {
    test("Then it should make a response with a token", async () => {
      const { token } = await request(app)
        .post("/user/register")
        .send(mockUser)
        .expect(201);

      expect(token).not.toBeNull();
    });
  });
});
