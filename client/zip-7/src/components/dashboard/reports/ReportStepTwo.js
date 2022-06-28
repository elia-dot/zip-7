import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  Spacer,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';

const ReportStepTwo = ({
  report,
  setReport,
  currentReportType,
  inputChange,
  removeInput,
  addInput,
}) => {
  
  const changeReportColumn = (e, i, primaryIndex) => {
    const { target } = e;
    const newColumns = [...report.columns];
    newColumns[primaryIndex][i] = target.value;
    setReport({ ...report, columns: newColumns });
  };

  const changeReportSplitedColumn = (e, i, index, primaryIndex) => {
    const { target } = e;
    const newColumns = [...report.columns];
    newColumns[primaryIndex][i][index][`${index}`] = target.value;
    setReport({ ...report, columns: newColumns });
  };

  const addLine = () => {
    const newColumns = [...report.columns];
    const newLine = currentReportType?.tableColumns.map(column =>
      typeof column === 'string'
        ? ''
        : column.columns.map((c, i) => ({ [i]: '' }))
    );
    newColumns.push(newLine);
    setReport({ ...report, columns: newColumns });
  };

  const removeLine = index => {
    const newColumns = [...report.columns];
    newColumns.splice(index, 1);
    setReport({ ...report, columns: newColumns });
  };

  return (
    <>
      <Accordion allowToggle allowMultiple>
        {report.columns.map((_, primaryIndex) => (
          <AccordionItem key={(primaryIndex +1) * 100}>
            <AccordionButton bg="gray.50">
              {report.columns.length > 1 && (
                <Icon
                  as={BsTrash}
                  mr="12px"
                  onClick={() => removeLine(primaryIndex)}
                />
              )}
              <Text>שורה {primaryIndex + 1}:</Text>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {currentReportType?.tableColumns.map((column, i) =>
                typeof column === 'string' ? (
                  <Input
                    placeholder={column}
                    mb="12px"
                    value={report.columns[primaryIndex][i]}
                    key={(i + 1) * 23}
                    onChange={e => {
                      changeReportColumn(e, i, primaryIndex);
                    }}
                  />
                ) : (
                  <>
                    <Text mb="12px">{`${column.columnTitle}:`}</Text>
                    {column.columns.map((c, index) => (
                      <Input
                        placeholder={c[index]}
                        key={(index + 1) * 10}
                        mb="12px"
                        value={
                          report.columns[primaryIndex][i][index][`${index}`]
                        }
                        onChange={e =>
                          changeReportSplitedColumn(e, i, index, primaryIndex)
                        }
                      />
                    ))}
                  </>
                )
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
        <Button bg="blue.600" color="white" my="24px" onClick={addLine}>
          הוסף שורה
        </Button>
      </Accordion>
      <Text>הערות:</Text>
      {Array(report.notes.length)
        .fill(0)
        .map((_, index) => (
          <Flex key={index} gap="8px">
            <InputGroup>
              <Input
                value={report.notes[index]}
                onChange={e =>
                  inputChange(e, index, report, setReport, 'notes')
                }
                mb="10px"
              />
              {report.notes[index] !== '' && (
                <InputRightElement
                  children={<IoMdClose />}
                  cursor="pointer"
                  onClick={() => removeInput(report, setReport, 'notes', index)}
                />
              )}
            </InputGroup>
            {index === report.notes.length - 1 && (
              <IconButton
                icon={<IoMdAdd />}
                onClick={() => addInput(report, setReport, 'notes')}
                disabled={report.notes[index] === ''}
              />
            )}
          </Flex>
        ))}
      <Text>פעולות לביצוע:</Text>
      {Array(report.actions.length)
        .fill(0)
        .map((_, index) => (
          <Flex key={index} gap="8px">
            <InputGroup>
              <Input
                value={report.actions[index]}
                onChange={e =>
                  inputChange(e, index, report, setReport, 'actions')
                }
                mb="10px"
              />
              {report.actions[index] !== '' && (
                <InputRightElement
                  children={<IoMdClose />}
                  cursor="pointer"
                  onClick={() =>
                    removeInput(report, setReport, 'actions', index)
                  }
                />
              )}
            </InputGroup>
            {index === report.actions.length - 1 && (
              <IconButton
                icon={<IoMdAdd />}
                onClick={() => addInput(report, setReport, 'actions')}
                disabled={report.actions[index] === ''}
              />
            )}
          </Flex>
        ))}
      <Text>מסקנות:</Text>
      {Array(report.conclusions.length)
        .fill(0)
        .map((_, index) => (
          <Flex key={index} gap="8px">
            <InputGroup>
              <Input
                value={report.conclusions[index]}
                onChange={e =>
                  inputChange(e, index, report, setReport, 'conclusions')
                }
                mb="10px"
              />
              {report.conclusions[index] !== '' && (
                <InputRightElement
                  children={<IoMdClose />}
                  cursor="pointer"
                  onClick={() =>
                    removeInput(report, setReport, 'conclusions', index)
                  }
                />
              )}
            </InputGroup>
            {index === report.conclusions.length - 1 && (
              <IconButton
                icon={<IoMdAdd />}
                onClick={() => addInput(report, setReport, 'conclusions')}
                disabled={report.conclusions[index] === ''}
              />
            )}
          </Flex>
        ))}
    </>
  );
};

export default ReportStepTwo;
