import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Company from '../models/Company.js';
import { generateRandomStr } from '../utils/generateRandomStr.js';
import { createLog } from './logController.js';

export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    isMasterContact,
    companyDetails,
  } = req.body;
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
    role: role ? role : 'contact',
    password,
    company: company._id,
  });
  company.contacts.push(user._id);

  let users = await User.find({ company: company._id });
  if (isMasterContact !== undefined) {
    if (isMasterContact) {
      company.primaryContact = user._id;
    } else {
      if (users.length > 1) {
        users = users.filter(
          (usr) => usr._id.toString() !== user._id.toString()
        );
        company.primaryContact = users[0]._id;
      } else {
        company.primaryContact = user._id;
      }
    }
    await company.save();
  }
  company = await Company.findById(company._id).populate(
    'contacts primaryContact'
  );
  user.password = undefined;
  createLog('create user', req.user._id, user._id);
  return res.status(201).json({
    success: true,
    user,
    company,
  });
};
export const getUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({
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

  const { firstName, lastName, phone, role, isMasterContact, companyId } =
    req.body;
  let company = await Company.findById(companyId);

  if (firstName !== undefined) user.firstName = firstName;
  if (lastName !== undefined) user.lastName = lastName;
  if (phone !== undefined) user.phone = phone;
  if (role !== undefined)
    user.role = req.user.role === 'master' ? role : user.role;

  let users = await User.find({ company: companyId });
  if (isMasterContact !== undefined) {
    if (isMasterContact) {
      company.primaryContact = user._id;
    } else {
      if (users.length > 1) {
        users = users.filter((user) => user._id.toString() !== req.params.id);
        company.primaryContact = users[0]._id;
      } else {
        company.primaryContact = req.params.id;
      }
    }
    await company.save();
  }

  await user.save();
  createLog('update user', req.user._id, user._id);
  company = await Company.findById(companyId).populate(
    'contacts primaryContact'
  );
  user.password = undefined;
  res.status(200).json({
    success: true,
    user,
    company,
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  let company = await Company.findById(user.company);

  if (company) {
    if (company.contacts.length === 1) {
      return res.status(400).json({
        success: false,
        message: 'Company must have at least one contact',
      });
    }

    company.contacts = company.contacts.filter(
      (contact) => contact.toString() !== user._id.toString()
    );

    if (company.primaryContact.toString() === user._id.toString()) {
      let users = await User.find({ company: company._id });
      users = users.filter((user) => user._id.toString() !== req.params.id);
      company.primaryContact = users[0]._id;
      await company.save();
    }
    await company.save();
    await user.remove();
    company = await Company.findById(company._id).populate(
      'contacts primaryContact'
    );
  }

  res.status(200).json({
    success: true,
    message: 'User deleted',
    company,
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
