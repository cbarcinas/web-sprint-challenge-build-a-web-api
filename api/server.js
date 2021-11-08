// Configure your server here
const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require("./actions/actions-router");
server.use("/api/actions", actionsRouter);

// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require("./projects/projects-router");
server.use("/api/projects", projectsRouter);

// Do NOT `server.listen()` inside this file!

const currentTime = new Date().toLocaleTimeString();

server.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: `Server is running as of ${currentTime}`,
  });
});

// server.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     message: err.message,
//   });
// });

module.exports = server;
