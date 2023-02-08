const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Review = require("../models/Reviews.model");
const {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
} = require("../middleware/route.guard");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

router.get("/", isLoggedIn, isAdmin, (req, res, next) => {
  try {
    res.render("admin/adminHome", {
      userInSession: req.session.currentUser,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/all-products", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    console.log(allProducts);

    res.render("admin/adminAllProducts", { allProducts });
  } catch (err) {
    next(err);
  }
});

router.get("/create-product", isLoggedIn, isAdmin, (req, res, next) => {
  try {
    res.render("admin/adminCreateProduct");
  } catch (err) {
    next(err);
  }
});

router.post("/create-product", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    await Product.create(req.body);
    res.redirect("/admin/all-products");
  } catch (err) {
    next(err);
  }
});

router.get("/reviews", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("thisReviewIsAbout");
    let areThereAnyReviews = true;
    if (reviews.length === 0) {
      areThereAnyReviews = false;
    }

    await res.render("admin/reviews", {
      reviews,
      areThereAnyReviews,
      currentUser: req.session.currentUser,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/reviews/:reviewId/edit", isLoggedIn, async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId).populate(
    "thisReviewIsAbout"
  );

  res.render("admin/edit-review", review);
});

router.post("/reviews/:reviewId/edit", isLoggedIn, async (req, res, next) => {
  const { text, stars } = req.body;
  const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, {
    text,
    stars,
  });
  await console.log(updatedReview);
  res.redirect("/admin/reviews");
});

router.get("/users", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find({ userType: "user" });

    await console.log(users);
    await res.render("admin/users", { users });
  } catch (error) {
    next(error);
  }
});

router.get("/users/:userId", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    await console.log(user);
    await res.render("admin/individualUser", user);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users/:userId/edit",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.userId, req.body);
    await res.redirect(`/admin/users/${req.params.userId}`);
  }
);

router.get("/:productId", isLoggedIn, isAdmin, (req, res, next) => {
  try {
    Product.findById(req.params.productId).then((individualProduct) => {
      console.log(individualProduct);
      res.render("admin/adminIndividualProduct", individualProduct);
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:productId/delete",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const id = req.params.productId;
      console.log("id is" + id);
      await Product.findByIdAndDelete(id);
      await res.redirect("/admin/all-products");
    } catch (err) {
      next(err);
    }
  }
);

router.post("/:productId/edit", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.productId, req.body);
    res.redirect(`/admin/${req.params.productId}`);
  } catch (err) {
    next(err);
  }
});

router.get("/hi", isLoggedIn, isAdmin, (req, res) => {
  res.send("hi");
});

module.exports = router;
