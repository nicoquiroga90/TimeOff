require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const teamsRouter = require("./API/teams");
const membersRouter = require("./API/members");
const timeoffRouter = require("./API/timeoff");
const buildPath = path.join(__dirname, "../../dist");
const cors = require("cors");

app.use(express.static(buildPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/api/teams", teamsRouter);
app.use("/api/members", membersRouter);
app.use("/api/timeoff", timeoffRouter);


module.exports = app;
