const session = require("express-session");
// const { CyclicSessionStore } = require("@cyclic.sh/session-store");

const sessionFunction = (app) => {
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      name: "GuitarShopSess",
      cookie: {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        maxAge: 6000000, // 60 * 1000 ms === 1 min
      },
    })
  );
};

// const options = {
//   table: {
//     name: 'cycles',
//   }
// };

// const sessionFunction = (app) => {
//   app.use(
//     session({
//       store: new CyclicSessionStore(options),

//     })
//   );
// };

module.exports = sessionFunction;
