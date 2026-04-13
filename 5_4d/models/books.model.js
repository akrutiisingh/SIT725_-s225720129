const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title too short"],
      maxlength: [100, "Title too long"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      minlength: [2, "Author name too short"],
      maxlength: [60, "Author name too long"],
    },
    year: {
      type: Number,
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    genre: {
      type: String,
      enum: [
        "Fiction",
        "Fantasy",
        "Science Fiction",
        "Classic",
        "Historical Fiction",
      ],
    },
    summary: { type: String, maxlength: [500, "Summary too long"] },
    price: {
      type: mongoose.Decimal128,
      required: [true, "Price is required"],
      validate: {
        validator: function (v) {
          return parseFloat(v.toString()) > 0;
        },
        message: "Price must be positive",
      },
      get: (v) => v?.toString(),
    },
    currency: { type: String, default: "AUD" },
  },
  {
    toJSON: {
      getters: true,
      virtuals: false,
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: { getters: true, virtuals: false },
  },
);

module.exports = mongoose.model("Book", BookSchema);
