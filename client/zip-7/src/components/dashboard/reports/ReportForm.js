import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Button,
  Text,
} from '@chakra-ui/react';

import AddCompany from '../companies/AddCompany';
import PickMachine from './PickMachine';
import { useDispatch, useSelector } from 'react-redux';

import { addReport, editReport } from '../../../redux/actions/reports';
import ReportStepOne from './ReportStepOne';
import ReportStepTwo from './ReportStepTwo';

const ReportForm = ({ isOpen, onClose, modalType, oldReport }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [showMachinesTable, setShowMachinesTable] = useState(false);
  const [currentReportType, setCurrentReportType] = useState(null);
  const [currentCompany, setCurrentCompany] = useState(null);
  const { loading, reportTypes } = useSelector(state => state.reports);

  const [report, setReport] = useState({
    review: '',
    company: '',
    machine: {
      model: '',
      year: '',
      manufacturer: '',
      serialNumber: '',
    },
    machineDescription: '',
    machineLicenseNumber: '',
    location: '',
    reportNumber: '',
    reportType: '',
    columns: [['']],
    notes: [''],
    actions: [''],
    conclusions: [''],
  });

  useEffect(() => {
    if (!oldReport && report.review !== '') {
      const current = reportTypes.filter(type => type._id === report.review)[0];
      const reportColumns = current.tableColumns.map(column =>
        typeof column === 'string'
          ? ''
          : column.columns.map((c, i) => ({ [i]: '' }))
      );
      setReport({ ...report, columns: [reportColumns] });
    }
  }, [report.review]);

  useEffect(() => {
    if (oldReport) {
      setReport({ ...oldReport, company: oldReport.company._id });
      setCurrentReportType(
        reportTypes.filter(type => type._id === oldReport.review._id)[0]
      );
      setCurrentCompany(oldReport.company);
    }
  }, []);

  const closeCompanyForm = () => {
    setShowCompanyForm(false);
  };

  const closeMachineTable = () => {
    setShowMachinesTable(false);
  };

  const inputChange = (e, index, state, setState, input) => {
    const { target } = e;
    const newInputs = [...state[input]];
    newInputs[index] = target.value;
    setState({ ...state, [input]: newInputs });
  };

  const removeInput = (state, setState, input, i) => {
    const newInputs = [...state[input]];
    if (i === state[input].length - 1) {
      newInputs[i] = '';
    } else {
      newInputs.splice(i, 1);
    }
    setState({ ...state, [input]: newInputs });
  };

  const addInput = (state, setState, input) => {
    const newInputs = [...state[input]];
    newInputs.push('');
    setState({ ...state, [input]: newInputs });
  };

  const handleNextClick = () => {
    if (step === 1) {
      setStep(2);
    } else {
      submit();
    }
  };

  const handleBackButton = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onClose();
    }
  };

  const submit = () => {
    report.date = new Date();
    if (startDate !== '') {
      report.nextReport = startDate;
    }

    if (modalType === 'edit') {
      dispatch(editReport(report));
    } else {
      if (report._id) {
        report._id = undefined;
      }
      dispatch(addReport(report));
    }
    setReport({
      review: '',
      company: '',
      machine: {
        model: '',
        year: '',
        manufacturer: '',
        serialNumber: '',
      },
      machineDescription: '',
      machineLicenseNumber: '',
      location: '',
      reportNumber: '',
      reportType: '',
      columns: [['']],
      notes: [''],
      actions: [''],
      conclusions: [''],
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <AddCompany isOpen={showCompanyForm} onClose={closeCompanyForm} />
      <PickMachine
        isOpen={showMachinesTable}
        onClose={closeMachineTable}
        report={report}
        setReport={setReport}
      />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalType === 'edit' ? '?????????? ??????????' : '?????????? ??????'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 1 && (
            <ReportStepOne
              report={report}
              setReport={setReport}
              currentReportType={currentReportType}
              inputChange={inputChange}
              removeInput={removeInput}
              addInput={addInput}
              setShowMachinesTable={setShowMachinesTable}
              setShowCompanyForm={setShowCompanyForm}
              setCurrentReportType={setCurrentReportType}
              oldReport={oldReport}
              startDate={startDate}
              setStartDate={setStartDate}
              currentCompany={currentCompany}
              setCurrentCompany={setCurrentCompany}
            />
          )}
          {step === 2 && (
            <ReportStepTwo
              report={report}
              setReport={setReport}
              currentReportType={currentReportType}
              inputChange={inputChange}
              removeInput={removeInput}
              addInput={addInput}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleBackButton}>
            {step === 1 ? '??????????' : '??????????'}
          </Button>
          <Button
            bg="blue.600"
            color="white"
            ml={3}
            display="flex"
            alignItems="center"
            gap="8px"
            onClick={handleNextClick}
            disabled={step === 1 && report.review === ''}
          >
            <Text>{step === 1 ? '??????' : '????????'}</Text>
            {loading && <Spinner size="sm" />}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportForm;
