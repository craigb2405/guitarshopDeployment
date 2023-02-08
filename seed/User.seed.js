const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const MONGO_URI = require("../db/index");

const data = [
  {
    email: "joesatriani@gmail.com",
    passwordHash: "fjghsdfhgjksdhgj",
    userType: "user",
    name: "Joe Satriani",
    consent: "Yes",
    favourites: [],
    reviews: [],
  },
  {
    email: "guthriegovan@gmail.com",
    passwordHash: "fjghsdfhgjksdhgj",
    userType: "user",
    name: "Guthrie Govan",
    consent: "Yes",
    favourites: ["63d510e9e233db263150fdc2"],
    reviews: [],
  },
  {
    email: "yngwiemalmsteen@gmail.com",
    passwordHash: "fjghsdfhgjksdhgj",
    userType: "user",
    name: "Yngwie Malmsteen",
    consent: "Yes",
    favourites: [],
    reviews: [],
  },
  {
    email: "johnpetrucci@gmail.com",
    passwordHash: "fjghsdfhgjksdhgj",
    userType: "user",
    name: "John Petrucci",
    consent: "No",
    favourites: [],
    reviews: [],
  },
  {
    email: "robinford@gmail.com",
    passwordHash: "fjghsdfhgjksdhgj",
    userType: "user",
    name: "Robin Ford",
    consent: "Yes",
    favourites: [],
    reviews: [],
  },
  {
    email: "tomquayle@gmail.com",
    passwordHash: "fjghsdfhgjksdhgj",
    userType: "user",
    name: "Tom Quayle",
    consent: "Yes",
    favourites: [],
    reviews: [],
  },
];

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connection Made");
    User.create(data);
  })
  .catch((error) => {
    console.log(error);
  });
