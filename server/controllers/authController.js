import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import validator from 'email-validator';

import Company from '../models/Company.js';
import User from '../models/User.js';
import { generateAuthToken, verifyToken } from '../utils/jwt.js';
import { generateRandomStr } from '../utils/generateRandomStr.js';

export const signup = async (req, res) => {
  const { firstName, lastName, email, phone, password, companyDetails } =
    req.body;
  if (!validator.validate(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address',
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ sucssess: false, message: 'User already exists' });
  }
  let company = await Company.findOne({ BN: companyDetails.BN });
  if (!company) {
    company = new Company(companyDetails);
    await company.save();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  const newUser = new User({
    firstName,
    lastName,
    phone,
    email,
    verificationToken,
    password: hashedPassword,
    company: company._id,
  });
  const token = await generateAuthToken(newUser);
  await newUser.save();
  res.cookie('jwt', token, {
    httpOnly: true,
  });
  res.status(201).json({
    sucssess: true,
    token,
    user,
  });
};

export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'You are not logged in! Please log in to get access.',
    });
  }
  try {
    const decoded = await verifyToken(token);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
    if (user.blocked) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked.',
      });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: 'You are not logged in! Please log in to get access.',
    });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to perform this action',
      });
    }
    next();
  };
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a password',
    });
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Incorrect password',
    });
  }
  if(user.blocked){
    return res.status(403).json({
      success: false,
      message: 'Your account has been blocked.',
    })
  }
  const token = await generateAuthToken(user);
  res.cookie('jwt', token, {
    httpOnly: true,
  });
  user.password = undefined;
  res.status(200).json({
    success: true,
    token,
    user,
  });
};

export const getAuthUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
}

export const validateEmail = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).select('verificationToken');
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }
  const { token } = req.params;
  if (token !== user.verificationToken) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token',
    });
  }
  user.verified = true;
  user.verificationToken = null;
  await user.save();
  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
  });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide an email address',
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    }
    const token = generateRandomStr(8);
    console.log(token);
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();
    //TODO: send email with link to reset password
    res.status(200).json({
        success: true,
        message: 'Email sent',
    });
}

export const validatePasswordToken = async (req, res) => {
    const { resetToken } = req.body;
    if (!resetToken) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a reset token',
        });
    }
    const user = await User.findOne({ resetToken }).select('+resetTokenExpiry');
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    }
    if (user.resetTokenExpiry < Date.now()) {
        return res.status(400).json({
            success: false,
            message: 'Reset token expired',
        });
    }
    res.status(200).json({
        success: true,
        message: 'Reset token valid',
    });
}

//create password for the first time or after forgot password
export const createPassword = async (req, res) => {
    const { resetToken, email } = req.body;
    let user
    if (resetToken ) {
        user = await User.findOne({ resetToken }).select('+resetTokenExpiry');
    }
    if (email) {
        user = await User.findOne({ email }).select('+resetTokenExpiry');
    } 
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    }
    
    if (user.resetTokenExpiry < Date.now()) {  
        return res.status(400).json({
            success: false,
            message: 'Reset token expired',
        });
    }
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a password',
        });
    }
    user.password = await bcrypt.hash(password, 12);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.status(200).json({
        success: true,
        message: 'Password updated successfully',
    });
}

//update password normally

export const updatePassword = async (req, res) => {
    const { oldPassword, password } = req.body;
    if (!password | !oldPassword) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a password',
        });
    }
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: 'Incorrect password',
        });
    }
    const newPassword = await bcrypt.hash(req.body.password, 10);
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: 'Password updated successfully',
    });
}


