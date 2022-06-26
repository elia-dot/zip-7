import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
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
  machineDescription: {
    type: String,
    required: true,
  },
  machineLicenseNumber: {
    type: String,
    required: true,
  },
  machine: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Machine',
  },
  reviewer : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  columns: [
    {
      type: Object,
      required: true,
    },
  ],
});

export default mongoose.model('Report', ReportSchema);
