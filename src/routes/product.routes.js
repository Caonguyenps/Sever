const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth.middleware");
const productModel = require("../models/product.model");
const ProductController = require("../controllers/product.controller");
// router.post("/create", async (req, res) => {
//   const data = {
//     productName: "Snack khoai tây vị rong biển Peke Potato Chips lon 80g",
//     code: "peke123",
//     categoryID: "62a1ad62b0f43a1f2043fae1",
//     subCategoryID: "62a1b35a0bd123526527c1a2",
//     image: [
//       {
//         url: "https://res.cloudinary.com/ecommercestore/image/upload/v1657107787/product/snack-khoai-tay-vi-rong-bien-peke-potato-chips-lon-80g-202203181414172263_x3kder.jpg",
//         publicID: "",
//       },
//       {
//         url: "https://res.cloudinary.com/ecommercestore/image/upload/v1657107805/product/snack-khoai-tay-vi-rong-bien-peke-potato-chips-lon-80g-201910111430004311_jcdsr3.jpg",
//         publicID: "",
//       },
//     ],
//     price: 28000,
//   };
//   await productModel(data)
//     .save()
//     .then((res) => {
//       console.log(res);
//     });
//   res.send("success");
// });
router.get("/home/:type", ProductController.getHomeProductType);

router.get("/category/:categoryID/:page", ProductController.getProductCategory);
router.post("/filter", ProductController.getProductFilter);
router.get("/details/:productID", ProductController.getDeailsProduct);
router.get(
  "/related/:categoryID/:subCategoryID/:branchID",
  ProductController.getRelatedProduct
);

router.get("/search/:categoryID/:search", ProductController.searchProduct);

router.use(AuthMiddlewares.isAuthAdmin);

// router.patch("/password/:ownerID", AdminController.updatePassword);

module.exports = router;
