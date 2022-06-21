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
      type: Object,
      required: true,
    },
  ],
});

export default mongoose.model('Review', ReviewSchema);
