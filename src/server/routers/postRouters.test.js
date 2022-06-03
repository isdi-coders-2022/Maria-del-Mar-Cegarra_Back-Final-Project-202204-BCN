const request = require("supertest");
const mongoose = require("mongoose");
const app = require("..");
const connectDB = require("../../database");
const Post = require("../../database/models/Post");
const User = require("../../database/models/User");
const { mockPosts, mockPostsUsers } = require("../../mocks/postMocks");

let postsTest;
let postsUsersTest;
const testDB = process.env.MONGODB_STRING_TEST;

beforeAll(async () => {
  await connectDB(testDB);
});

beforeEach(async () => {
  postsTest = mockPosts;
  postsUsersTest = mockPostsUsers;
  await User.create(postsUsersTest);
  await Post.create(postsTest);
});

afterEach(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Given the /posts endpoint", () => {
  describe("When a GET request is made with pageSize 2 and page 2 in the body", () => {
    test("Then it should respond with status 200 and 2 post object skipping the first 2", async () => {
      const pages = {
        pageSize: 2,
        page: 2,
      };
      const expectedBody = { posts: [mockPosts[2], mockPosts[3]] };

      const { body } = await request(app)
        .get("/posts/")
        .send(pages)
        .expect(200);

      expect(body).toEqual(expectedBody);
    });
  });
});
