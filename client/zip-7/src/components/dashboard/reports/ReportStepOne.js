import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Select as SelectComponent,
} from '@chakra-ui/react';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import he from 'date-fns/locale/he';
import Select from 'react-select';
import { useSelector } from 'react-redux';

import AddReportType from './AddReportType';

registerLocale('he', he);

const ReportStepOne = ({
  report,
  setReport,
  setCurrentReportType,
  setIsTypeChanged,
  currentReportType,
  inputChange,
  removeInput,
  addInput,
  setShowMachinesTable,
  setShowCompanyForm,
}) => {
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [startDate, setStartDate] = useState('');
  const { companies } = useSelector(state => state.companies);
  const { reportTypes } = useSelector(state => state.reports);

  const reportTypesOptions = reportTypes.map(type => ({
    value: type,
    label: type.type,
  }));

  const companiesOptions = companies.map(company => ({
    value: company._id,
    label: company.name,
  }));

  const handleReportChange = e => {
    const { target } = e;
    setReport({ ...report, [target.name]: target.value });
  };

  const changeMachine = e => {
    const { target } = e;
    const { name, value } = target;
    setReport({ ...report, machine: { ...report.machine, [name]: value } });
  };

  useEffect(() => {
    if (report.company !== '') {
      setCurrentCompany(
        companies.filter(company => company._id === report.company)[0]
      );
    }
  }, [report.company]);

  const clearOldData = () => {
    // const cuurent = reportTypes.filter(type => type._id === report.review)[0];
    // const reportColumns = cuurent.tableColumns.map(column =>
    //   typeof column === 'string'
    //     ? ''
    //     : column.columns.map((c, i) => ({ [i]: '' }))
    // );
    // setReport({ ...report, columns: [reportColumns] });
    if (currentReportType.machineType === 'מכונה') {
      setReport({
        ...report,
        machine: { model: '', year: '', manufacturer: '', serialNumber: '' },
      });
    } else {
      setReport({
        ...report,
        machine: '',
      });
    }
  };

  const selectType = e => {
    setCurrentReportType(
      reportTypes.filter(type => type._id === e.target.value)[0]
    );
    clearOldData();
    setReport({ ...report, review: e.target.value });
  };

  return (
    <>
      <Box>
        <Text>סוג תסקיר:</Text>
        <Flex gap="8px" mb="12px" alignItems="center">
          <Box flex={1}>
            <SelectComponent
              value={currentReportType ? currentReportType._id : ''}
              onChange={selectType}
              placeholder="בחר סוג תסקיר"
            >
              {reportTypesOptions.map(type => (
                <option key={type.value._id} value={type.value._id}>
                  {type.label}
                </option>
              ))}
            </SelectComponent>
          </Box>
          <Button onClick={() => setShowTypeForm(true)}>הוסף סוג תסקיר</Button>
        </Flex>
        {showTypeForm && (
          <AddReportType
            setShowTypeForm={setShowTypeForm}
            inputChange={inputChange}
            removeInput={removeInput}
            addInput={addInput}
          />
        )}
      </Box>
      <Box mb="24px">
        <Text>חברה:</Text>
        <Flex gap="8px" mb="12px" alignItems="center">
          <Box flex={1}>
            <Select
              options={companiesOptions}
              onChange={({ value }) => {
                setReport({ ...report, company: value });
              }}
              placeholder={currentCompany ? currentCompany.name : 'בחר חברה'}
            />
          </Box>
          <Button onClick={() => setShowCompanyForm(true)}>הוסף חברה</Button>
        </Flex>
      </Box>
      {currentReportType?.machineType === 'מכונה' ? (
        <>
          {' '}
          <Flex
            gap="8px"
            mb="12px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>כלי:</Text>
            <Button onClick={() => setShowMachinesTable(true)}>
              בחר כלי מרשימה
            </Button>
          </Flex>
          <Flex gap="8px" mb="12px">
            <Input
              placeholder="דגם"
              value={report.machine.model}
              name="model"
              onChange={changeMachine}
            />
            <Input
              placeholder="מס' סידורי"
              value={report.machine.serialNumber}
              name="serialNumber"
              onChange={changeMachine}
            />
          </Flex>
          <Flex gap="8px" mb="12px">
            <Input
              placeholder="יצרן"
              value={report.machine.manufacturer}
              name="manufacturer"
              onChange={changeMachine}
            />
            <Input
              placeholder="שנת ייצור"
              value={report.machine.year}
              name="year"
              onChange={changeMachine}
            />
          </Flex>
        </>
      ) : currentReportType?.machineType === 'אביזר הרמה' ? (
        <Input
          placeholder="מס' סידורי"
          value={report.machine}
          name="serialNumber"
          onChange={e => setReport({ ...report, machine: e.target.value })}
        />
      ): null}
      <Flex gap="8px" mb="24px">
        <Input
          placeholder="תיאור הכלי"
          name="machineDescription"
          value={report.machineDescription}
          onChange={handleReportChange}
          required
        />
        <Input
          placeholder="מס' רישוי"
          name="machineLicenseNumber"
          value={report.machineLicenseNumber}
          onChange={handleReportChange}
          required
        />
      </Flex>
      <Flex gap="8px" mb="12px">
        <Input
          placeholder="איזור"
          name="location"
          value={report.location}
          onChange={handleReportChange}
          required
        />
        <Input
          placeholder="מס' תסקיר"
          name="reportNumber"
          value={report.reportNumber}
          onChange={handleReportChange}
          required
        />
      </Flex>
      <Flex gap="8px" mb="12px">
        <Input
          placeholder="סוג הבדיקה"
          name="reportType"
          value={report.reportType}
          onChange={handleReportChange}
          required
          flex={2}
        />
        <Box flex={3}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            className="date-picker"
            placeholderText="תאריך בדיקה הבאה"
            dateFormat="dd/MM/yyyy"
            isClearable={startDate}
            clearButtonClassName="clear-date"
            locale="he"
          />
          <Text display="flex" fontSize="13px" gap="8px">
            *ברירת מחדל:
            <Moment
              date={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              }
              format="DD/MM/YYYY"
            />
          </Text>
        </Box>
      </Flex>{' '}
    </>
  );
};

export default ReportStepOne;
