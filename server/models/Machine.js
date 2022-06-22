import mongoose from 'mongoose';

const machineSchema = mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
});


export default mongoose.model('Machine', machineSchema);
