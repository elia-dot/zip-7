import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  reviewType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  nextReport: {
    type: Date,
    default: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  },
  location: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: String,
    },
  ],
  actions: [
    {
      type: String,
    },
  ],
  conclusions: [
    {
      type: String,
    },
  ],
  reportNumber: {
    type: String,
    required: true,
  },
  reportType: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Report', ReportSchema);
