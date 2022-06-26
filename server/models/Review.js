import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  machineType: {
    type: String,
    required: true,
    enum : ['מכונה', 'אביזר הרמה'],
  },
  saftyOrdinance: {
    type: String,
    required: true,
  },
  tableColumns: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  ],
});

export default mongoose.model('Review', ReviewSchema);
