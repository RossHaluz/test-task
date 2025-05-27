const { registerUser, loginUser } = require("../controllers/authControllers");
const { validateBody } = require("../middlewars");
const { authSchema } = require("../schema/joiSchemas");

const router = require("express").Router();

//Register
router.post("/register", validateBody(authSchema), registerUser);

//Login
router.post("/login", validateBody(authSchema), loginUser);

module.exports = router;
