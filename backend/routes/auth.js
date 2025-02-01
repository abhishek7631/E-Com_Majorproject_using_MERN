const express = require("express");
const { register, login, testController } = require("../controllers/auth");
const { authSignIn, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/test", authSignIn, isAdmin, testController);

module.exports = router;
