const request = require("supertest");
const mongoose = require("mongoose");
const app = require("..");
const connectDB = require("../../database");
const Post = require("../../database/models/Post");
const User = require("../../database/models/User");
const { mockPosts, mockPostsUsers } = require("../../mocks/postMocks");

let postsTest;
let postsUsersTest;
let postToDelete;
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
  postToDelete = await Post.create(postsTest[7]);
});

afterEach(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => "verified token",
}));

describe("Given the /posts/pageSize=2&page=2 endpoint", () => {
  describe("When a GET request is ", () => {
    test("Then it should respond with status 200 and 2 post object skipping the first 2", async () => {
      const expectedBody = { posts: [mockPosts[2], mockPosts[3]] };
      const pageSize = 2;
      const page = 2;

      const { body } = await request(app)
        .get(`/posts/pageSize=${pageSize}&page=${page}`)
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(body.posts[0].picture).toBe(expectedBody.posts[0].picture);
      expect(body.posts[1].picture).toBe(expectedBody.posts[1].picture);
    });
  });
});

describe("Given the /posts/delete/629621ccddb32826175e5b9b endpoint", () => {
  describe("When a DELETE request is made", () => {
    test("Then it should respond with status 200 and the object with the same id deleted", async () => {
      const idPostDelete = postToDelete.id;
      const expectedBody = {
        postDeleted: {
          id: idPostDelete,
          picture: "picture8.jpg",
          user: "629621ccddb32826175e5b9e",
          caption: "Picture 8",
          date: "2019-04-23T18:25:43.511Z",
          hashtags: ["painting"],
        },
      };

      const { body } = await request(app)
        .delete(`/posts/delete/${idPostDelete}`)
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(body.postDeleted).toEqual(expectedBody.postDeleted);
    });
  });
});

describe("Given the /posts/create endpoint", () => {
  describe("When a POST request is made with a new post in it's body", () => {
    test("Then it should respond with status 201 and the new post", async () => {
      Post.create = jest.fn().mockResolvedValueOnce(mockPosts[0]);
      const expectedBody = {
        post: mockPosts[0],
      };
      const { body } = await request(app)
        .post("/posts/create")
        .set({ authorization: "Bearer token" })
        .expect(201);

      expect(body).toEqual(expectedBody);
    });
  });
});
