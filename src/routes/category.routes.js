const router = require("express").Router();
const CategoryController = require("../controllers/category.controller");
router.get("/:type", CategoryController.getListsCategory);
router.get(
  "/details-category/:categoryID",
  CategoryController.getDetailsCategory
);

router.get(
  "/details-sub-category/:subCategoryID",
  CategoryController.getDetailsSubCategory
);

module.exports = router;
