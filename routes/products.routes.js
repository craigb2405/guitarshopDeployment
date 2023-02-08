const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Review = require("../models/Reviews.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route.guard");

router.get("/all-products", async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    await res.render("all-products", { allProducts });
  } catch (err) {
    next(err);
  }
});

router.get("/acoustic%20guitar", (req, res, next) => {
  Product.find({ productType: "acoustic guitar" })
    .then((acousticGuitars) => {
      console.log(acousticGuitars);
      res.render("all-products", { acousticGuitars });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/electric%20guitar", (req, res, next) => {
  Product.find({ productType: "electric guitar" })
    .then((electricGuitars) => {
      res.render("all-products", { electricGuitars });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/bass%20guitar", (req, res, next) => {
  Product.find({ productType: "bass guitar" })
    .then((bassGuitars) => {
      console.log(bassGuitars);
      res.render("all-products", { bassGuitars });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/pedal", (req, res, next) => {
  Product.find({ productType: "pedal" })
    .then((pedals) => {
      console.log(pedals);
      res.render("all-products", { pedals });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/amplifier", (req, res, next) => {
  Product.find({ productType: "amplifier" })
    .then((amplifiers) => {
      console.log(amplifiers);
      res.render("all-products", { amplifiers });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/products/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .populate("reviews")
    .then((individualProduct) => {
      console.log(
        `THIS IS THE PRODUCT PAGE FOR >>>>> ${individualProduct.productName}`
      );
      let areThereAnyReviews = true;
      if (individualProduct.reviews.length === 0) {
        areThereAnyReviews = false;
      }
      res.render("individualProduct", {
        individualProduct,
        areThereAnyReviews,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/products/:productId/post-review",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { stars, text } = req.body;
      const user = req.session.currentUser.name;
      const userID = req.session.currentUser._id;
      const thisReviewIsAbout = req.params.productId;
      const dateCreated = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }).format();
      const review = await Review.create({
        thisReviewIsAbout: thisReviewIsAbout,
        writtenBy: user,
        userID: userID,
        dateCreated: dateCreated,
        stars: stars,
        text: text,
        active: true,
      });
      console.log(review);

      await Product.findByIdAndUpdate(req.params.productId, {
        $push: { reviews: review },
      });
      await User.findByIdAndUpdate(req.session.currentUser._id, {
        $push: { reviews: review },
      });
      res.redirect(`/products/${req.params.productId}`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
