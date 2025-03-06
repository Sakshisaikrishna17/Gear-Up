const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const vendorSchema = new Schema(
  {
    user_Name: {
      type: String,
      required: [true, "Please enter user full name"],
    },
    user_Email: {
      type: String,
      required: [true, "Please enter email"],
    },
    company_name: {
      type: String,
      required: [true, "Please enter company name"],
    },
    country_code: {
      type: String,
    },
    mobile_no: {
      type: String,
      required: [true, "Please enter mobile number"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deleteFlag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);
