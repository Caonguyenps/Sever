const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth.middleware");
const DailyDiscoverController = require("../controllers/dailyDiscover.controller");
// router.patch("/password/:ownerID", AdminController.updatePassword);
router.get("/talk", DailyDiscoverController.getCustomerTalk);

module.exports = router;
