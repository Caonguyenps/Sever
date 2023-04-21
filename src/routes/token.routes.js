const router = require("express").Router();
const TokenController = require("../controllers/token.controller");

router.post("/refresh-token", TokenController.refreshToken);

module.exports = router;
