const Booking = require('../models/booking.model');

exports.processPayment = async (req, res) => {
  try {
    // const { user_Id, item, rentalPeriod, costBreakdown, paymentMethod, rentalTermsAgreed } = req.body;

    const { user_Id, listing_Id, rentalPeriod, costBreakdown, paymentMethod, rentalTermsAgreed } = req.body;


    // Validate required fields
    if (!user_Id || !listing_Id || !rentalPeriod || !costBreakdown || !paymentMethod || rentalTermsAgreed === undefined) {
      return res.status(400).send({ message: 'All fields are required', status: 400 });
    }

    // Create a new booking
    const newBooking = await Booking.create({
      user_Id,
      listing_Id,
      rentalPeriod,
      costBreakdown,
      paymentMethod,
      rentalTermsAgreed,
      paymentStatus: 'Completed' // Assuming payment is successful
    });

    return res.status(200).send({
      data: newBooking,
      message: 'Payment processed successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in processPayment:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found', status: 404 });
    }

    // Check if the booking can be cancelled (within 24 hours of the rental period)
    const now = new Date();
    const rentalStartDate = new Date(booking.rentalPeriod.startDate);
    const timeDifference = rentalStartDate - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      return res.status(400).send({ message: 'Cancellation is not allowed within 24 hours of the rental period', status: 400 });
    }

    // Update the booking status to Cancelled
    booking.paymentStatus = 'Cancelled';
    await booking.save();

    return res.status(200).send({
      data: booking,
      message: 'Booking cancelled successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in cancelBooking:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};