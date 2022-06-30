import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  actionOnType: String,
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
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'actionOnType',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

logSchema.pre('find', function (next) {
  this.populate('creator');
  this.populate('actionOn');
  next();
});

export default mongoose.model('Log', logSchema);
