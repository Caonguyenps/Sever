const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth.middleware");
const FavouriteController = require("../controllers/favourite.controller");

router.use(AuthMiddlewares.isAuth);

router.post("/add", FavouriteController.addFavourite);
router.post("/delete", FavouriteController.deleteFavourite);
router.get("/lists/:ownerID", FavouriteController.getFavourite);
router.get("/details/:ownerID", FavouriteController.getDetailsFavourite);

module.exports = router;
