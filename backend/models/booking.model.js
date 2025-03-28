const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
//   item: {
//     type: String,
//     required: true
//   },
 listing_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  rentalPeriod: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  costBreakdown: {
    rentalPricePerDay: { type: Number, required: true },
    serviceFee: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Google Pay', 'Apple Pay', 'PayPal'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  rentalTermsAgreed: {
    type: Boolean,
    required: true
  },
  pickupDetails: {
    location: { type: String, trim: true },
    city: { type: String, trim: true },
    pickupTime: { type: Date }
  },
  returnDetails: {
    rentalDuration: { type: Number }, // In days
    lateReturnAlert: { type: String, trim: true },
    status: { type: String, enum: ['Active', 'Returned'], default: 'Active' }
  },
  qrCode: {
    type: String, // Store the QR code URL or data
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);