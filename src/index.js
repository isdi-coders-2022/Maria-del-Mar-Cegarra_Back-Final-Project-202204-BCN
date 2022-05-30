require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("set-appArt:server");
const connectDB = require("./database");
const initializeServer = require("./server/initializeServer");

const port = process.env.SERVER_PORT ?? 4000;
const connectionString = process.env.MONGODB_STRING;

(async () => {
  try {
    await connectDB(connectionString);
    await initializeServer(port);
  } catch {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();
