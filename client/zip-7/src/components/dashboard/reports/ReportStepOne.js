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
  currentReportType,
  inputChange,
  removeInput,
  addInput,
  setShowMachinesTable,
  setShowCompanyForm,
  startDate,
  setStartDate,
  currentCompany,
  setCurrentCompany,
}) => {
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);

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

  const selectType = e => {
    setSelectedReportType(e.target.value);
  };

  useEffect(() => {
    setSelectedReportType(report.review?._id);
  }, [report.review._id]);

  useEffect(() => {
    if (selectedReportType && selectedReportType !== report.review._id) {
      const review = reportTypes.filter(
        type => type._id === selectedReportType
      )[0];

      setReport({ ...report, review: selectedReportType });
      setCurrentReportType(review);

      const reportColumns = review.tableColumns.map(column =>
        typeof column === 'string'
          ? ''
          : column.columns.map((c, i) => ({ [i]: '' }))
      );

      setReport(prev => ({ ...prev, columns: [reportColumns] }));

      if (selectedReportType === '??????????') {
        setReport({
          ...report,
          machine: { model: '', year: '', manufacturer: '', serialNumber: '' },
        });
      } else {
        setReport(prev => ({
          ...prev,
          machine: '',
        }));
      }
    }
  }, [selectedReportType]);

  return (
    <>
      <Box>
        <Text>?????? ??????????:</Text>
        <Flex gap="8px" mb="12px" alignItems="center">
          <Box flex={1}>
            <SelectComponent
              value={currentReportType ? currentReportType._id : ''}
              onChange={selectType}
              placeholder="?????? ?????? ??????????"
            >
              {reportTypesOptions.map(type => (
                <option key={type.value._id} value={type.value._id}>
                  {type.label}
                </option>
              ))}
            </SelectComponent>
          </Box>
          <Button onClick={() => setShowTypeForm(true)}>???????? ?????? ??????????</Button>
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
        <Text>????????:</Text>
        <Flex gap="8px" mb="12px" alignItems="center">
          <Box flex={1}>
            <Select
              options={companiesOptions}
              onChange={({ value }) => {
                setReport({ ...report, company: value });
              }}
              placeholder={currentCompany ? currentCompany.name : '?????? ????????'}
            />
          </Box>
          <Button onClick={() => setShowCompanyForm(true)}>???????? ????????</Button>
        </Flex>
      </Box>
      {currentReportType?.machineType === '??????????' ? (
        <>
          {' '}
          <Flex
            gap="8px"
            mb="12px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>??????:</Text>
            <Button onClick={() => setShowMachinesTable(true)}>
              ?????? ?????? ????????????
            </Button>
          </Flex>
          <Flex gap="8px" mb="12px">
            <Box flex={1}>
              <Text>??????:</Text>
              <Input
                value={report.machine.model}
                name="model"
                onChange={changeMachine}
              />
            </Box>
            <Box flex={1}>
              <Text>????' ????????????:</Text>
              <Input
                value={report.machine.serialNumber}
                name="serialNumber"
                onChange={changeMachine}
              />
            </Box>
          </Flex>
          <Flex gap="8px" mb="12px">
            <Box flex={1}>
              <Text>????????:</Text>
              <Input
                value={report.machine.manufacturer}
                name="manufacturer"
                onChange={changeMachine}
              />
            </Box>
            <Box flex={1}>
              <Text>?????? ??????????:</Text>
              <Input
                value={report.machine.year}
                name="year"
                onChange={changeMachine}
              />
            </Box>
          </Flex>
        </>
      ) : currentReportType?.machineType === '?????????? ????????' ? (
        <>
          <Text>??????:</Text>
          <Text>????' ????????????:</Text>
          <Input
            value={report.machine}
            name="serialNumber"
            mb="12px"
            onChange={e => setReport({ ...report, machine: e.target.value })}
          />
        </>
      ) : null}
      <Flex gap="8px" mb="24px">
        <Box flex={1}>
          <Text>?????????? ????????:</Text>
          <Input
            name="machineDescription"
            value={report.machineDescription}
            onChange={handleReportChange}
            required
          />
        </Box>
        <Box flex={1}>
          <Text>????' ??????????:</Text>
          <Input
            name="machineLicenseNumber"
            value={report.machineLicenseNumber}
            onChange={handleReportChange}
            required
          />
        </Box>
      </Flex>
      <Flex gap="8px" mb="12px">
        <Box flex={1}>
          <Text>?????????? ????????????:</Text>
          <Input
            name="location"
            value={report.location}
            onChange={handleReportChange}
            required
          />
        </Box>
        <Box flex={1}>
          <Text>????' ??????????:</Text>
          <Input
            name="reportNumber"
            value={report.reportNumber}
            onChange={handleReportChange}
            required
          />
        </Box>
      </Flex>
      <Flex gap="8px" mb="12px">
        <Box flex={1}>
          <Text>?????? ????????????:</Text>
          <Input
            name="reportType"
            value={report.reportType}
            onChange={handleReportChange}
            required
            flex={2}
          />
        </Box>
        <Box flex={3}>
          <Text>?????????? ?????????? ????????:</Text>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            className="date-picker"
            dateFormat="dd/MM/yyyy"
            isClearable={startDate}
            clearButtonClassName="clear-date"
            locale="he"
          />
          <Text display="flex" fontSize="13px" gap="8px">
            *?????????? ????????:
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
