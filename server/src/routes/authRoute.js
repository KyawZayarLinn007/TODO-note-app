const express = require("express");
const { register_post, login_post, logout_post } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register_post);
router.post("/login", login_post);
router.post("/logout", logout_post);

module.exports = router;