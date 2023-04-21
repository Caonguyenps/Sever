const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();
const port = process.env.PORT || 6689;
const connectDB = require("./src/configs/db");
const userRoutes = require("./src/routes/user.routes");
const adminRoutes = require("./src/routes/admin.routes");
const tokenRoutes = require("./src/routes/token.routes");
const categoryRoutes = require("./src/routes/category.routes");
const branchRoutes = require("./src/routes/branch.routes");
const bannerRoutes = require("./src/routes/banner.routes");
const productRoutes = require("./src/routes/product.routes");
const customerRoutes = require("./src/routes/customer.routes");
const dailyDiscoverRoutes = require("./src/routes/dailyDiscover.routes");
const favouriteRoutes = require("./src/routes/favourite.routes");
const cartRoutes = require("./src/routes/cart.routes");

app.use(express.json());
//morgan
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

//connectDB
connectDB();

//init router

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/token", tokenRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/daily", dailyDiscoverRoutes);
app.use("/api/v1/favourite", favouriteRoutes);
app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/admin", adminRoutes);

app.listen(port, () => {
  console.log("Server on port: " + port);
});
