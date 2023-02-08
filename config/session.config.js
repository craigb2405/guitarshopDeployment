const session = require("express-session");

const sessionFunction = (app) => {
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 6000000, // 60 * 1000 ms === 1 min
      },
    })
  );
};

module.exports = sessionFunction;
