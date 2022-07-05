import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  docModel: {
    type: String,
    required: true,
    enum: ['User', 'Company', 'Report', 'Review'],
  },
  action: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  actionOn: {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report',
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

logSchema.pre('find', function (next) {
  this.populate('creator');
  this.populate('actionOn.company');
  this.populate('actionOn.user');
  this.populate('actionOn.report');
  this.populate('actionOn.review');
  next();
});

export default mongoose.model('Log', logSchema);
