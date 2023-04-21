const router = require("express").Router();
const BranchController = require("../controllers/branch.controller");
router.get("/:categoryID", BranchController.getBranchCategory);

module.exports = router;
