import { Box, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Report from '../reports/Report';

const CompanyReportsTab = ({ company }) => {
  const [companyReport, setCompanyReport] = useState([]);
  const { reports } = useSelector(state => state.reports);

  useEffect(() => {
    setCompanyReport(
      reports.filter(report => report.company._id === company._id)
    );
  }, [company._id]);
  return (
    <Box>
      {companyReport.map(report => (
        <>
          <Report key={report._id} report={report} />
          {companyReport.length > 1 && <Divider />}
        </>
      ))}
    </Box>
  );
};

export default CompanyReportsTab;
