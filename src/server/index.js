const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const { generalError, notFoundError } = require("../middlewares/errors");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:4000",
    "http://localhost:4005",
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:5002",
    "https://mariam-lliso-front-final-project-202204-bcn.netlify.app/",
    "https://mariam-lliso-front-final-project-202204-bcn.netlify.app",
  ],
};

app.use(cors(corsOptions));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
