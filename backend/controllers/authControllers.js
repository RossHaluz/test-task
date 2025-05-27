const { httpError, ctrlWrapper } = require("../helpers");
const { prismadb } = require("../utils/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    throw httpError(400, "User already exist");
  }

  const hasPassword = await bcrypt.hash(password, 10);

  const newUser = await prismadb.user.create({
    data: {
      ...req.body,
      password: hasPassword,
    },
  });

  if (!newUser) {
    throw httpError(400, "Something went wrong...");
  }

  const payload = {
    userId: newUser?.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(201).json({ newUser, token });
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw httpError(400, "User not found");
  }

  const comparePassword = await bcrypt.compare(password, user?.password);

  if (!comparePassword) {
    throw httpError(400, "Password is not correct");
  }

  const payload = {
    userId: user?.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(200).json({ user, token });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
};
