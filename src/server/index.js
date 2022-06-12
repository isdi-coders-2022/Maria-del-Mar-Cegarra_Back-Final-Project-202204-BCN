const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const auth = require("./middlewares/auth/auth");
const userRouter = require("./routers/userRouter");
const { notFoundError, generalError } = require("./middlewares/errors/errors");
const postRouter = require("./routers/postRouters");
const galleryRouter = require("./routers/gallery/galleryRouters");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4000",
    "http://localhost:4005",
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:5002",
    "https://maria-del-mar-cegarra-back-final-project.onrender.com/",
    "https://maria-del-mar-cegarra-back-final-project.onrender.com",
    "https://maria-del-mar-cegarra-front-final-project-202204-bcn.netlify.app/",
    "https://maria-del-mar-cegarra-front-final-project-202204-bcn.netlify.app",
  ],
};

app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

app.use("/user", userRouter);
app.use("/posts", auth, postRouter);
app.use("/galleries", auth, galleryRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
