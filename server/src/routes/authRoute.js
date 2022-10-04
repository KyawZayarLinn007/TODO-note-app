const express = require("express");
const { register_post, login_post } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register_post);
router.post("/login", login_post);

module.exports = router;