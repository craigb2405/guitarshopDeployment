const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    thisReviewIsAbout: { type: Schema.Types.ObjectId, ref: "Product" },

    writtenBy: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: String,
      required: true,
    },
    stars: {
      type: String,
      // enum: [,2,3,4,5],
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
