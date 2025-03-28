const Review = require('../models/review.model');

exports.submitReview = async (req, res) => {
  try {
    const { user_Id, list_Id, rating, comment } = req.body;

    // Validate required fields
    if (!user_Id || !list_Id || !rating) {
      return res.status(400).send({ message: 'User ID, Item/List ID, and Rating are required', status: 400 });
    }

    // Validate rating range (1 to 5)
    if (rating < 1 || rating > 5) {
      return res.status(400).send({ message: 'Rating must be between 1 and 5', status: 400 });
    }

    // Create a new review
    const newReview = await Review.create({
      user_Id,
      list_Id,
      rating,
      comment
    });

    return res.status(200).send({
      data: newReview,
      message: 'Review submitted successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in submitReview:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};