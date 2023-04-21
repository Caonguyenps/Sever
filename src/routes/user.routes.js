const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
router.post("/register", UserController.register);
router.post("/verify-otp-register", UserController.verifyOtpRegister);
router.post("/resend-otp", UserController.resendOTP);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.patch(
  "/new-password",
  AuthMiddlewares.isAuthForgotPassword,
  UserController.updateNewsPassword
);

router.use(AuthMiddlewares.isAuth);

//profile
router.get("/profile/:ownerID", UserController.getProfileUser);
router.patch("/password/:ownerID", UserController.updatePassword);
router.patch("/avatar/:ownerID", UserController.updateAvatar);
router.patch("/profile/:ownerID", UserController.updateProfile);

//delivery
router.post("/delivery-address", UserController.createDeliveryAddress);
router.get(
  "/delivery-address/:addressID",
  UserController.getDetailsDeliveryAddress
);
router.get(
  "/lists-delivery-address/:ownerID",
  UserController.getListsDeliveryAddressUser
);
router.patch(
  "/delivery-address/:addressID",
  UserController.updateDeliveryAddress
);
router.delete(
  "/delivery-address/:addressID",
  UserController.deleteDeliveryAddress
);

module.exports = router;
