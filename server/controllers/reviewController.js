import Review from '../models/Review.js';

export const addReview = async (req, res) => {
  try {
    const { type, saftyOrdinance, tableColumns } = req.body;
    const newReviewType = new Review({
      type,
      saftyOrdinance,
      tableColumns
    });
    await newReviewType.save();
    res.status(200).json({
      success: true,
      review: newReviewType,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const editReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, saftyOrdinance } = req.body;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }
    if (type !== undefined) review.type = type;
    if (saftyOrdinance !== undefined) review.saftyOrdinance = saftyOrdinance;
    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }
    await review.remove();
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
