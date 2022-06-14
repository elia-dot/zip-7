import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      select : false,
    },
    role: {
      type: String,
      required: true,
      enum: ['contact', 'admin', 'master', 'client', 'inspector'],
      default: 'client',
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    phone: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      select: false,
      expires: '24h',
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
      default: null,
      select: false,
    },
    resetTokenExpires: {
      type: Date,
      default: null,
      select: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
