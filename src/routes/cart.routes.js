const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

router.use(AuthMiddlewares.isAuth);

router.post('/add/:ownerID', CartController.addToCart);
router.get('/list/:ownerID', CartController.getListCart);
router.delete('/delete/:cartID', CartController.deleteCart);

router.post('/order/add/:ownerID', CartController.addOrder);
router.get('/order/list/:ownerID', CartController.listOrder);
router.get('/order/details/:orderID', CartController.getDetailOrder)


module.exports = router;

