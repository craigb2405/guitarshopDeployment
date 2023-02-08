const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`mongodb+srv://craigomar:Atlas123!@guitarshop.8z0i4u9.mongodb.net/guitarshop?retryWrites=true&w=majority`);
});
