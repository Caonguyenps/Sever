const admin = require("firebase-admin");

// const serviceAccount = require("../resources/ecommercestore-d5b7f-firebase-adminsdk-oook3-c52abfd510.json");
const serviceAccount = require("../resources/showroom-f3071-firebase-adminsdk-9ua0f-db5741e5b7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
