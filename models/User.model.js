const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    consent: {
      type: String,
      required: true,
    },
    favourites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
