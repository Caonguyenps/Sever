const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth.middleware");
const dailyDiscoverModel = require("../models/dailyDiscover.model");
const DailyDiscoverController = require("../controllers/dailyDiscover.controller");
// router.patch("/password/:ownerID", AdminController.updatePassword);
router.get("/home", DailyDiscoverController.getHomeProductDaily);

module.exports = router;
