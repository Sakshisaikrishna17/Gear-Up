// issue.controller.js
const List = require('../models/list.model');
// const user = require('../models/user.model');
const vendor = require('../models/vendor.model');


exports.createList = async (req, res) => {
  try {
    const { vendor_id, title, category, description, pricing, availability } = req.body;
    const photoUrl = req.file ? req.file.path : null; // Get the path of the uploaded image

    // Validate required fields
    if (!vendor_id || !title || !category || !description || !pricing || !availability || !photoUrl) {
      return res.status(400).send({ message: 'All fields are required', status: 400 });
    }

    // Create a new listing
    const newListing = await List.create({
      vendor_id,
      title,
      category,
      description,
      pricing,
      availability,
      photoUrl // Store the single image path
    });

    return res.status(200).send({
      data: newListing,
      message: 'Listing created successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in createList:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};

