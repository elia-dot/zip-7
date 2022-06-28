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

import { addReport } from '../../../redux/actions/reports';

import ReportStepOne from './ReportStepOne';
import ReportStepTwo from './ReportStepTwo';

const ReportForm = ({ isOpen, onClose, modalType, oldReport }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [isTypeChanged, setIsTypeChanged] = useState(false);

  const [showMachinesTable, setShowMachinesTable] = useState(false);
  const [currentReportType, setCurrentReportType] = useState(null);
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
      const cuurent = reportTypes.filter(type => type._id === report.review)[0];
      const reportColumns = cuurent.tableColumns.map(column =>
        typeof column === 'string'
          ? ''
          : column.columns.map((c, i) => ({ [i]: '' }))
      );
      setReport({ ...report, columns: [reportColumns] });
    } else if (oldReport && report.review !== '') {
      const cuurent = reportTypes.filter(
        type => type._id === report.review._id
      )[0];
      const reportColumns = cuurent.tableColumns.map(column =>
        typeof column === 'string'
          ? ''
          : column.columns.map((c, i) => ({ [i]: '' }))
      );
      setReport({ ...report, columns: [reportColumns] });
    }
  }, [report.review]);

  console.log(report);
  // useEffect(() => {
  //   if (isTypeChanged) {
  //     const reportColumns = currentReportType?.tableColumns.map(column =>
  //       typeof column === 'string'
  //         ? ''
  //         : column.columns.map((c, i) => ({ [i]: '' }))
  //     );
  //     setReport({ ...report, columns: [reportColumns] });
  //     setIsTypeChanged(false);
  //   }
  // }, [isTypeChanged, currentReportType]);

  useEffect(() => {
    if (oldReport) {
      setReport(oldReport);
      setCurrentReportType(
        reportTypes.filter(type => type._id === oldReport.review._id)[0]
      );
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
    dispatch(addReport(report));
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
          {modalType === 'edit' ? 'עריכת תסקיר' : 'תסקיר חדש'}
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
              setIsTypeChanged={setIsTypeChanged}
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
            {step === 1 ? 'ביטול' : 'הקודם'}
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
            <Text>{step === 1 ? 'הבא' : 'שמור'}</Text>
            {loading && <Spinner size="sm" />}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportForm;
