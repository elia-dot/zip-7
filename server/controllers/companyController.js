import Company from '../models/Company.js';
import User from '../models/User.js';

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.aggregate([
      {
        $lookup: {
          from: 'reports',
          localField: '_id',
          foreignField: 'company',
          as: 'reports',
        },
      },
    ]);
    await User.populate(companies, { path: 'contacts primaryContact' });
    res.status(200).json({ success: true, companies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const companyContact = await User.findOne({ company: id });
    if (
      req.user.role !== 'master' &&
      req.user._id.toString() !== companyContact._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this resource',
      });
    }
    const company = await Company.findById(req.params.id).populate(
      'contacts primaryContact'
    );
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
export const createCompany = async (req, res) => {
  try {
    const { BN } = req.body;
    const company = await Company.findOne({ BN });
    if (company) {
      return res.status(400).json({
        success: false,
        message: 'Company already exists',
      });
    }
    let contact = await User.findOne({ email: req.body.contact.email });
    if (!contact) {
      contact = await User.create(req.body.contact);
    }
    const contactId = contact._id;
    const { name, address, city, phone, email, fax, zipCode } = req.body;
    const newCompany = await Company.create({
      name,
      address,
      city,
      phone,
      email,
      fax,
      zipCode,
      BN,
    });
    newCompany.contacts.push(contactId);
    newCompany.primaryContact = contactId;
    contact.company = newCompany._id;
    await contact.save();
    await newCompany.save();
    res.status(201).json({
      success: true,
      company: newCompany,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    let company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: 'Company not found',
      });
    }
    if (
      req.user.role !== 'master' &&
      !company.contacts.includes(req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this resource',
      });
    }
    const { name, address, city, phone, email, fax, zipCode } = req.body;
    if (name !== undefined) company.name = name;
    if (address !== undefined) company.address = address;
    if (city !== undefined) company.city = city;
    if (email !== undefined) company.email = email;
    if (fax !== undefined) company.fax = fax;
    if (zipCode !== undefined) company.zipCode = zipCode;
    if (phone !== undefined) company.phone = phone;

    await company.save();

    company = await Company.findById(companyId).populate(
      'contacts primaryContact'
    );
    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: 'Company not found',
      });
    }
    const companyContacts = company.contacts;
    companyContacts.forEach(async (contactId) => {
      await User.findByIdAndDelete(contactId);
    });
    //TODO: delete company related documents
    res.json({ success: true, message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const searchCompany = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const companies = await Company.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { BN: { $regex: searchTerm, $options: 'i' } },
        { city: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    res.status(200).json({ success: true, companies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
