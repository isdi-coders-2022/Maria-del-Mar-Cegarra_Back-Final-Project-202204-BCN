const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const auth = require("./middlewares/auth");
const userRouter = require("./routers/userRouter");
const { notFoundError, generalError } = require("./middlewares/errors");
const postRouter = require("./routers/postRouters");

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
  ],
};

app.use(cors(corsOptions));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", auth, postRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
