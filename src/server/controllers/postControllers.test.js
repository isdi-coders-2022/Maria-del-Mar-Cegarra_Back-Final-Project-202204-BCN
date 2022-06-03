const { getPosts } = require("./postControllers");

const mockPosts = [
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

jest.mock("../../database/models/Post", () => ({
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
}));

describe("Given the getPosts controller", () => {
  describe("When it receives a request with a page size 2 and page 2, a response and a next function", () => {
    test("Then it should call res' status and json methods with 200 and 2 post objects respectively", async () => {
      const req = {
        body: {
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
        posts: [mockPosts[2], mockPosts[3]],
      });
    });
  });
});
