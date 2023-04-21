const router = require("express").Router();
const BannerController = require("../controllers/banner.controller");
router.get("/", BannerController.getBanner);

module.exports = router;
