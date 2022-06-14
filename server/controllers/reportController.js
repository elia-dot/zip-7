import Report from '../models/Report.js';
import Company from '../models/Company.js';
import User from '../models/User.js';

export const addReport = async (req, res) => {
  try {
    const {
      review,
      location,
      contact,
      notes,
      actions,
      conclusions,
      reportNumber,
      reportType,
      machineDescription,
      machineLicenseNumber,
      machine,
    } = req.body;
    let reportContact = await User.findOne({ email: contact.email });
    let reportCompany;

    if (!reportContact) {
      reportCompany = await Company.findOne({ BN: contact.companyDetails.BN });
      if (!reportCompany) {
        reportCompany = await Company.create(contact.company);
      }
      reportContact = await User.create({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
        role: 'contact',
        company: reportCompany._id,
      });
    } else {
      reportCompany = await Company.findById(reportContact.company);
    }

    const report = await Report.create({
      company: reportCompany._id,
      contact: reportContact._id,
      notes,
      location,
      actions,
      conclusions,
      reportNumber,
      reportType,
      machineDescription,
      machineLicenseNumber,
      review,
      machine,
    });
    return res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getReports = async (req, res) => {
  try {
    let reports;
    const id = req.user._id;
    const user = await User.findById(id);
    if (user.role === 'master') {
      reports = await Report.find();
    } else {
      reports = await Report.find({ contact: user._id });
    }
    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }
    if (req.user.role !== 'master' && req.user._id !== report.contact) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    return res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const editReport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      review,
      location,
      contact,
      notes,
      actions,
      conclusions,
      reportNumber,
      reportType,
      machineDescription,
      machineLicenseNumber,
      machine,
    } = req.body;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }
    let reportContact;
    let reportCompany;

    if (contact) {
      reportContact = await User.findOne({ email: contact.email });
      if (!reportContact) {
        reportCompany = await Company.findOne({
          BN: contact.companyDetails.BN,
        });
        if (!reportCompany) {
          reportCompany = await Company.create(contact.companyDetails);
        }
        reportContact = await User.create({
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          role: 'contact',
          company: reportCompany._id,
        });
      } else {
        reportCompany = await Company.findById(reportContact.company);
      }
    }

    if (reportCompany) report.company = reportCompany._id;
    if (reportContact) report.contact = reportContact._id;
    if (notes) report.notes = notes;
    if (location) report.location = location;
    if (actions) report.actions = actions;
    if (conclusions) report.conclusions = conclusions;
    if (reportNumber) report.reportNumber = reportNumber;
    if (reportType) report.reportType = reportType;
    if (machineDescription) report.machineDescription = machineDescription;
    if (machineLicenseNumber)
      report.machineLicenseNumber = machineLicenseNumber;
    if (review) report.review = review;

    if (machine?.serialNumber)
      report.machine.serialNumber = machine.serialNumber;
    if (machine?.model) report.machine.model = machine.model;
    if (machine?.year) report.machine.year = machine.year;
    if (machine?.manufacturer)
      report.machine.manufacturer = machine.manufacturer;

    await report.save();
    return res.status(200).json({
      success: true,
      message: 'Report updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }
    await Report.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: 'Report deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getReportsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }
    const reports = await Report.find({ company: companyId });
    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const searchReportByMachine = async (req, res) => {
  try {
    const { machine } = req.params;
    const reports = await Report.find({
      $or: [
        { 'machine.model': { $regex: machine, $options: 'i' } },
        { 'machine.manufacturer': { $regex: machine, $options: 'i' } },
      ],
    });
    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
