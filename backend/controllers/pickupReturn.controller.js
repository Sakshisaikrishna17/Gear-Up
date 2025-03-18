const Booking = require('../models/booking.model');

exports.addPickupDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { location, city, pickupTime, qrCode } = req.body;
    // const { location, city, pickupTime } = req.body;

    // Validate required fields
    if (!location || !city || !pickupTime || !qrCode) {
      return res.status(400).send({ message: 'Location, city, pickup time, and QR code are required', status: 400 });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found', status: 404 });
    }

    // Add pickup details
    booking.pickupDetails = { location, city, pickupTime };
    booking.qrCode = qrCode;
    await booking.save();

    return res.status(200).send({
      data: booking,
      message: 'Pickup details added successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in addPickupDetails:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};

exports.addReturnDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rentalDuration, lateReturnAlert } = req.body;

    // Validate required fields
    if (!rentalDuration || !lateReturnAlert) {
      return res.status(400).send({ message: 'Rental duration and late return alert are required', status: 400 });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found', status: 404 });
    }

    // Add return details
    booking.returnDetails = { rentalDuration, lateReturnAlert, status: 'Returned' };
    await booking.save();

    return res.status(200).send({
      data: booking,
      message: 'Return details added successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in addReturnDetails:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};

exports.getPickupReturnDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found', status: 404 });
    }

    return res.status(200).send({
      data: {
        pickupDetails: booking.pickupDetails,
        returnDetails: booking.returnDetails,
        // qrCode: booking.qrCode
      },
      message: 'Pickup and return details fetched successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in getPickupReturnDetails:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};