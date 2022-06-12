import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  saftyOrdinance: {
    type: String,
    required: true,
  },
  tableColumns: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model('Review', ReviewSchema);
