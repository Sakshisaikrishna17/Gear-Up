// list.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  //   user_Id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true
  //   },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  pricing: {
    type: Number,
    required: true,
  },
  availability: {
    type: Date,
    required: true,
    // enum: ['Available', 'Unavailable'],
    // default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

listingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Listing", listingSchema);
