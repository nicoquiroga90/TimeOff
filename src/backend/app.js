require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const teamsRouter = require("./API/teams");
const membersRouter = require("./API/members");
const timeoffRouter = require("./API/timeoff");
const cors = require("cors");

app.use("/api/teams", teamsRouter);
app.use("/api/members", membersRouter);
app.use("/api/timeoff", timeoffRouter);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

module.exports = app;
