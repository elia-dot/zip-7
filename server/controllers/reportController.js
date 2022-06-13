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
    const company = await Company.findOne({ contact });
    const report = await Report.create({
      company: company._id,
      contact,
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
      message: 'Server error',
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
      message: 'Server error',
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
    if(req.user.role !== 'master' && req.user._id !== report.contact) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden'
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
      message: 'Server error',
    });
  }
};
