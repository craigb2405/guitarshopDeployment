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

router.get("/signup", isLoggedOut, (req, res, next) => {
  try {
    res.render("auth/signup");
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, passwordSecondEntry, name, consent } = req.body;

    if (!email || !password || !passwordSecondEntry || !name || !consent) {
      console.log("info missing"); // if one of the fields has not been filled in
      res.render("auth/signup", {
        errorMessage:
          "Please fill in all mandatory fields. Email and password are required.",
      });
      return;
    }
    const users = await User.find()
    console.log(users)
    for (x of users){
  
      if (email === x.email){
        res.render("auth/signup", {
          errorMessage:
            "Email already exists"
        });
        return;
      }
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; //This is a regular expression that will ensure the user's password
    // is long enough and has at least one uppercase letter
    if (!regex.test(password)) {
      res.render("auth/signup", {
        errorMessage:
          "Password not long enough. Must contain at least one uppercase letter",
        email: email,
        password: password,
      });
      return;
    }
     if (password !== passwordSecondEntry) {
      res.render("auth/signup", { errorMessage: "passwords must match" });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      email: email,
      passwordHash: hashedPassword,
      name: name,
      consent: consent,
      userType: "user",
    });
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
});

router.get("/login", isLoggedOut, (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(`SESSION -----> ${req.session}`);
    const { email, password } = req.body;
    if (!email || !password) {
      res.render("auth/login", {
        errorMessage: "please enter a valid email and password",
      });
    }
    const user = await User.findOne({ email });

    await console.log(user);
    if (!user) {
      await res.render("auth/login", { errorMessage: "User not found" });
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      await res.render("auth/login", {
        errorMessage: "Incorrect Password",
        email: email,
      });
    }

    if (
      user.userType === "user" &&
      bcrypt.compareSync(password, user.passwordHash)
    ) {
      req.session.currentUser = user;
      const reviews = await Review.find();
      for (x of reviews) {
        let userID = req.session.currentUser._id.toString();
        if (userID === x.userID) {
          await Review.findByIdAndUpdate(x._id, { active: true });
        }
      }
      res.redirect("/profile");
    }

    if (
      user.userType === "admin" &&
      bcrypt.compareSync(password, user.passwordHash)
    ) {
      req.session.currentUser = user;
      req.session.adminUser = user;
      res.redirect("/admin");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", isLoggedIn, async (req, res, next) => {
  const reviews = await Review.find();

  for (x of reviews) {
    let userID = req.session.currentUser._id.toString();
    if (userID === x.userID) {
      await Review.findByIdAndUpdate(x._id, { active: false });
    }
  }
  console.log(req.session.currentUser);

  req.session.destroy((err) => {
    if (err) next(err);
    // console.log(req.session.);

    res.redirect("/");
  });
});

module.exports = router;
