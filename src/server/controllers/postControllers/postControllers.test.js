const { mockPosts } = require("../../../mocks/postMocks");
const {
  getPosts,
  deletePost,
  createPost,
  getUserPosts,
} = require("./postControllers");

const posts = [
  {
    picture: "picture1.jpg",
    user: "1234",
    caption: "Picture 1",
    date: new Date("2000/2/12"),
  },
  {
    picture: "picture2.jpg",
    user: "5678",
    caption: "Picture 2",
    date: new Date("2000/2/12"),
  },
  {
    picture: "picture3.jpg",
    user: "1234",
    caption: "Picture 3",
    date: new Date("2000/2/12"),
  },
  {
    picture: "picture4.jpg",
    user: "9012",
    caption: "Picture 4",
    date: new Date("2000/2/12"),
  },
];

jest.mock("../../../database/models/Post", () => ({
  ...jest.requireActual("../../../database/models/Post"),
  skip: jest.fn().mockResolvedValue([
    {
      picture: "picture3.jpg",
      user: "1234",
      caption: "Picture 3",
      date: new Date("2000/2/12"),
    },
    {
      picture: "picture4.jpg",
      user: "9012",
      caption: "Picture 4",
      date: new Date("2000/2/12"),
    },
  ]),
  limit: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findByIdAndDelete: jest.fn().mockResolvedValue({
    id: "629621ccddb32826175e5b9b",
    picture: "picture8.jpg",
    user: "629621ccddb32826175e5b9e",
    caption: "Picture 8",
    date: "2019-04-23T18:25:43.511Z",
    hashtags: '["painting"]',
    pictureBackup: "pictureBackup.firebase.picture8.jpg",
  }),
  create: jest.fn().mockResolvedValue(mockPosts[0]),
  populate: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
}));

describe("Given the getPosts controller", () => {
  describe("When it receives a request with a page size 2 and page 2, a response and a next function", () => {
    test("Then it should call res' status and json methods with 200 and 2 post objects respectively", async () => {
      const req = {
        params: {
          pageSize: 2,
          page: 2,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await getPosts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        posts: [posts[2], posts[3]],
      });
    });
  });

  describe("When it receives a request with a page size 2 and no page, a response and a next function", () => {
    test("Then it should call next with a 400 error and 'Please provide a page and a page size'", async () => {
      const req = {
        params: {
          pageSize: 2,
          page: null,
        },
      };
      const expectedError = new Error();
      expectedError.customMessage = "Please provide a page and a page size";
      expectedError.statusCode = 400;
      const next = jest.fn();

      await getPosts(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the deletePost controller", () => {
  describe("When it receives a request with and id: ", () => {
    test("Then it should call res' status and json methods with 200 and the object deleted respectively", async () => {
      const req = {
        params: {
          id: "629621ccddb32826175e5b9b",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await deletePost(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ postDeleted: mockPosts[7] });
    });
  });

  describe("When it receives a request with no id, a response and a next function", () => {
    test("Then it should call next with a 400 error with 'Please provide an id'", async () => {
      const req = {
        params: {
          id: null,
        },
      };
      const expectedError = new Error();
      expectedError.customMessage = "Please provide an id";
      expectedError.statusCode = 400;
      const next = jest.fn();

      await deletePost(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the createPost controller", () => {
  const next = jest.fn();
  describe("When it receives a request with a new post, res and next", () => {
    test("Then it should call res' status and json methods with 201 and the new post respectively", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        body: mockPosts[0],
        file: {
          filename: "sunsetimage",
          originalname: "sunset.jpg",
        },
        userId: "2323",
      };

      await createPost(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ post: mockPosts[0] });
    });
  });
});

describe("Given the getUserPosts controller", () => {
  describe("When it receives a request with a page size 2 and page 2, a response and a next function", () => {
    test("Then it should call res' status and json methods with 200 and 2 post objects respectively", async () => {
      const req = {
        params: {
          userId: "1234",
          pageSize: 2,
          page: 2,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await getUserPosts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        posts: [posts[2], posts[3]],
      });
    });
  });
});
