import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Company from '../models/Company.js';
import { generateRandomStr } from '../utils/generateRandomStr.js';

export const createUser = async (req, res) => {
  const { firstName, lastName, email, phone, role, companyDetails } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: 'User already exists',
    });
  }
  let company = await Company.findOne({ BN: companyDetails.BN });
  if (!company) {
    company = new Company(companyDetails);
    await company.save();
  }
  let password;
  if (role === 'user') {
    password = generateRandomStr(8);
    //TODO: send email with password
    password = await bcrypt.hash(password, 10);
  }
  user = await User.create({
    firstName,
    lastName,
    phone,
    email,
    role,
    password,
    company: company._id,
  });
  user.password = undefined;
  res.status(201).json({
    success: true,
    user,
  });
};
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }
  if (
    req.user.role !== 'master' &&
    req.user._id.toString() !== user._id.toString()
  ) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to access this resource',
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
};
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }
  if (
    req.user.role !== 'master' &&
    req.user._id.toString() !== user._id.toString()
  ) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to access this resource',
    });
  }
  const { firstName, lastName, phone, role, companyDetails } = req.body;
  user.firstName = firstName;
  user.lastName = lastName;
  user.phone = phone;
  user.role = req.user.role === 'master' ? role : user.role;
  await user.save();
  const company = await Company.findOne({ email: companyDetails.email });
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found',
    });
  }
  const {
    name,
    address,
    city,
    phone: companyPhone,
    email,
    fax,
    zipCode,
  } = companyDetails;
  company.name = name;
  company.address = address;
  company.city = city;
  company.phone = companyPhone;
  company.email = email;
  company.fax = fax;
  company.zipCode = zipCode;
  await company.save();
  user.password = undefined;
  res.status(200).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }
  //TODO: delete releted documents
  res.status(200).json({
    success: true,
    message: 'User deleted',
  });
};

export const toggleBlock = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }
  user.blocked = !user.blocked;
  await user.save();
  res.status(200).json({
    success: true,
    message: user.blocked ? 'User blocked' : 'User unblocked',
  });
};

export const searchUser = async (req, res) => {
  const { searchTerm } = req.body;
  const users = await User.find({
    $or: [
      { firstName: { $regex: searchTerm, $options: 'i' } },
      { lastName: { $regex: searchTerm, $options: 'i' } },
      { email: { $regex: searchTerm, $options: 'i' } },
    ],
  });
  res.status(200).json({
    success: true,
    users,
  });
};
