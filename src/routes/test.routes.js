const router = require("express").Router();
const ProductSliderController = require("../controllers/productSlider.controller");
const OrderController = require("../controllers/order.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const productSlider = require("../models/productSlider.model");
const productModel = require("../models/product.model");
const categorySlideModel = require("../models/categorySlide.model");
var XLSX = require("xlsx");
// router.post("/test", async (req, res) => {
//   const filePath = req.files.data.tempFilePath;
//   var workbook = XLSX.readFile(filePath);
//   var sheet_name_list = workbook.SheetNames;
//   var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
//   let i = 0;
//   for (let item of xlData) {
//     let data = {
//       productName: item.productName,
//       code: "TG" + i,
//       subCategoryID: item.subCategoryID,
//       categoryID: item.categoryID,
//       brandID: "62d925d43d95d41dfc4bb5e6",
//       introduce:
//         "Được lên men tự nhiên từ các thành phần nước, đại mạch, lúa mì, ngũ cốc, hoa bia, bổ sung thêm vỏ cam, hạt râu mùi, Pectin táo, hương cam giống tự nhiên và men",
//       description:
//         "<div>Snack khoai tây giòn ngon, thơm khoai tây và gia vị được ướp. Snack khoai tây vị truyền thống Peke Potato Chips lon 80g còn thơm vị truyền thống thơm, ăn giòn tan rất kích thích vị giác. Snack Peke được đóng hộp sang trọng, tiện lợi sử dụng và bảo quản, lại có thể mang được bên người</div> <ul>     <li><strong>Loại bánh: </strong> Snack khoai tây vị truyền thống</li>      <li><strong>Khối lượng: </strong> 80g</li>    <li><strong>Năng lượng: </strong> 422.9kcal/80g</li>    <li><strong>Thành phần: </strong> Vẩy khoai tây, dầu thực vật (dầu cọ), tinh bột khoai tây, muối, đường, dextrin, lactose, protein hydrolyzate (lúa mì, đậu tương, dextrin, muối), gia vị, anti-baking agent, chất nhũ hoá</li>    <li><strong>Bảo quản: </strong> Bảo quản nơi khô mát, tránh ánh nắng trực tiếp và nhiệt độ cao</li>    <li><strong>Nơi sản xuất: </strong> Nơi sản xuất</li> </ul> <div>     <h2><strong>Vị giòn ngon từ những lát khoai tây tươi</strong></h2>   <div>     <p>       Snack khoai tây vị truyền thống Peke Potato Chips tuyển chọn nguồn nguyên liệu khoai tây tươi ngon nhất, được trồng trên những cánh đồng chuyên biệt, tạo nên vị tươi, ngọt của snack. Snack khoai tây từ nhà Peke Potato Chips sử dụng phương pháp chế biến hiện đại, cho ra sản phẩm snack khoai tây có độ giòn nhất định, mỏng và đặc biệt không hề thấm dầu như các loại snack khác. Snack khoai tây vị truyền thống Peke Potato Chips là sản phẩm snack khoai tây truyền thống có vị ngọt và hương thơm đặc trưng từ khoai tây, độ mặn từ lớp muối phủ bên ngoài cũng vừa phải, khiến bạn ăn không thể dừng tay được.     </p>   </div> </div>",
//       price: item.price,
//       image: [
//         {
//           type: "image",
//           url: item.image1,
//           publicID: "",
//         },
//         {
//           type: "image",
//           url: item.image2,
//           publicID: "",
//         },
//         {
//           type: "image",
//           url: item.image3,
//           publicID: "",
//         },
//       ],
//       price: item.price,
//     };
//     console.log(data);
//     await productModel(data)
//       .save()
//       .then((res) => {
//         console.log("success");
//       });
//     i++;
//   }
//   res.send("done");
// });

router.post("/test", async (req, res) => {
  const data = {
    categoryName: "Gạo",
  };
  await categorySlideModel(data)
    .save()
    .then((result) => {
      return res.send(result);
    });
});
router.get("/category", ProductSliderController.getCategoryProduct);
router.get("/slide/:categoryID", ProductSliderController.getProductSlider);
router.post("/order", OrderController.OrderProduct);
router.get("/order", OrderController.getListsOrder);

router.use(AuthMiddlewares.isAuthAdmin);
router.post("/company", OrderController.createCompany);
router.get("/company", OrderController.getListsCompany);
router.get("/company/:companyID", OrderController.getDetailsCompany);
router.patch("/company/:companyID", OrderController.updateCompany);

router.get("/order/:type", OrderController.getListOrderType);
router.patch("/product-order", OrderController.removeProductOrder);
router.patch("/confirm-order", OrderController.confirmOrder);
router.patch("/quantity-order", OrderController.updateQuantityOrder);
router.delete("/order/:orderID", OrderController.deleteOrder);

router.get("/product/:companyID/:page", OrderController.getProductCompany);
router.get("/search/:companyID/:search", OrderController.searchProduct);

router.get("/details-order/:orderID", OrderController.getDetailsOrder);

router.patch("/password", OrderController.updatePassword);

module.exports = router;
