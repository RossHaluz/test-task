const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();

const app = express();

//Middlewars
app.use(cors());
app.use(express.json());

//Routes
const authRoute = require("./routes/auth");
const projectRoute = require("./routes/project");

app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);

app.use((req, res) => {
  return res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  return res.status(status).json({ message });
});

module.exports = {
  app,
};
