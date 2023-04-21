const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const url = process.env.URL_MONGODB;

const connectDB = () => {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ToTo Store");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};

module.exports = connectDB;
