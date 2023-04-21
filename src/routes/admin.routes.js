const router = require("express").Router();
const AdminController = require("../controllers/admin.controller");
const BranchController = require("../controllers/branch.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const UserController = require("../controllers/user.controller");
const NewsController = require("../controllers/news.controller");
const productController = require("../controllers/product.controller");

router.post("/login", AdminController.login);

// router.use(AuthMiddlewares.isAuthAdmin);
// router.patch("/password/:ownerID", AdminController.updatePassword);

//category
router.post("/category", AdminController.createCategory);
router.post("/sub-category/:categoryID", AdminController.addSubCategory);
router.patch("/category/:categoryID", AdminController.updateCategory);
router.patch("/sub-category/:subCategoryID", AdminController.updateSubCategory);
router.delete("/category/:categoryID", AdminController.deleteCategory);
router.delete(
  "/sub-category/:categoryID/:subCategoryID",
  AdminController.deleteSubCategory
);

//branch
router.post("/branch", BranchController.createBranch);
router.patch("/branch/:branchID", BranchController.updateBranchName);
router.patch("/branch/category/:branchID", BranchController.addCategoryBranch);
router.delete("/branch/:branchID", BranchController.deleteBranch);
router.delete(
  "/branch/category/:branchID/:categoryID",
  BranchController.deleteCategoryBranch
);
router.get("/branch", BranchController.getAllBranch);

//user
router.get("/users/:page", UserController.getListsUser);
router.get("/users/details/:ownerID", UserController.getProfileUser);

//news
router.get("/news/details/:newsID", NewsController.getDetailsNews);
router.get("/news/:categoryID/:page", NewsController.getListsNews);
router.post("/news/:categoryID", NewsController.createNews);

//product
router.get("/product/lists", AdminController.getListsProduct);
router.delete("/product/delete/:id", AdminController.deleteProduct);
router.post("/product/add", AdminController.addProduct);
router.post("/product/edit/:productID", AdminController.updateProduct);

//statics
router.get("/statics", AdminController.statics)
router.get("/order/list", AdminController.getListOrder)




module.exports = router;
