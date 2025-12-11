const router = require("express").Router();
const controller = require("../controllers/login.controllers");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/logout", controller.logout);

module.exports = router;