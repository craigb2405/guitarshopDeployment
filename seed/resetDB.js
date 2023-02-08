// This file is a work in progress. Its purpose is to empty the 'reviews' and 'favourites' arrays in the 'User' and 'Product' collections



const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const MONGO_URI = require("../db/index");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connection Made");
    Product.updateMany({}, { $set: { reviews: [] } }, { multi: true });
  })
  .catch((error) => {
    console.log(error);
  });
