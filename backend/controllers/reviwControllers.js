import Review from "../models/Review.js";

const postReview = async (req, res) => {
  try {
    const { userId, username, reviewText, rating } = req.body;
    const newReview = new Review({ userId, username, reviewText, rating });
    await newReview.save();
    res.status(201).json({ message: 'Review saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { postReview };