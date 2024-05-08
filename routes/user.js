const express = require("express");
const router = express.Router();

const { signup, signin, signout } = require("../controllers/user");
const { userSignupValidator } = require("../validator");
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/hello", (req, res) => {
  res.send("hello there");
});
module.exports = router;
