const { createGallery } = require("./galleryControllers");

jest.mock("../../../database/models/Gallery", () => ({
  ...jest.requireActual("../../../database/models/Gallery"),
  create: jest.fn().mockResolvedValue({
    name: "Galeries Maldá",
    location: "Barcelona",
  }),
}));

describe("Given the createGallery controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with name and location at the body and a response", () => {
    test("Then it should call res' status and json method with 201 and the new gallery respectively", async () => {
      const expectedStatusCode = 201;
      const expectedBody = {
        gallery: {
          name: "Galeries Maldá",
          location: "Barcelona",
        },
      };
      const req = {
        body: {
          name: "Galeries Maldá",
          location: "Barcelona",
        },
      };

      await createGallery(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it receives a reques with no name or location and a next function", () => {
    test("Then it should call next with error 400 'Please provide a name and location'", async () => {
      const expectedError = new Error();
      expectedError.statusCode = 400;
      expectedError.customMessage = "Please provide a name and location";
      const req = {
        body: {
          location: "Barcelona",
        },
      };
      const next = jest.fn();

      await createGallery(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a reques with no name or location and a next function", () => {
    test("Then it should call next with error 400 'Please provide a name and location'", async () => {
      const expectedError = new Error();
      expectedError.statusCode = 400;
      expectedError.customMessage = "Please provide a name and location";
      const req = {
        body: {
          location: "Barcelona",
        },
      };
      const next = jest.fn();

      await createGallery(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
