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
  await Post.create(postsTest[0]);
  await Post.create(postsTest[1]);
  await Post.create(postsTest[2]);
  await Post.create(postsTest[3]);
  await Post.create(postsTest[4]);
  await Post.create(postsTest[5]);
  await Post.create(postsTest[6]);
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
      const expectedBody = { posts: [mockPosts[2], mockPosts[3]] };
      const pageSize = 2;
      const page = 2;
      const { body } = await request(app)
        .get(`/posts/pageSize=${pageSize}&page=${page}`)
        .expect(200);

      expect(body.posts[0].picture).toBe(expectedBody.posts[0].picture);
      expect(body.posts[1].picture).toContain(expectedBody.posts[1].picture);
    });
  });
});
