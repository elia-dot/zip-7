import React, {useState} from 'react';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  Flex,
  InputRightElement,
  Text,
  Spinner,
  Button,
  Select,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd, IoMdClose } from 'react-icons/io';

import { addReportType } from '../../../redux/actions/reports';

function AddReportType({setShowTypeForm, inputChange, removeInput, addInput} ) {
  const [newReportType, setNewReportType] = useState({
    type: '',
    saftyOrdinance: '',
    tableColumns: [''],
    machineType: '',
  });
  const { loading } = useSelector(state => state.reports);
  const dispatch = useDispatch();

  const splitColumn = () => {
    const newReportTypeColumns = newReportType.tableColumns;
    newReportTypeColumns.push({
      columnTitle: '',
      columns: [{ 0: '' }, { 1: '' }],
    });
    setNewReportType({ ...newReportType, tableColumns: newReportTypeColumns });
  };

  const handleNewTypeChange = e => {
    const { target } = e;
    setNewReportType({ ...newReportType, [target.name]: target.value });
  };

  const changeColumnTitle = (e, i) => {
    const { target } = e;
    const newColumns = [...newReportType.tableColumns];
    newColumns[i].columnTitle = target.value;
    setNewReportType({ ...newReportType, tableColumns: newColumns });
  };

  const changeInnerColumn = (e, i, index) => {
    const { target } = e;
    const newColumns = [...newReportType.tableColumns];
    newColumns[index].columns[i] = { [i]: target.value };
    setNewReportType({ ...newReportType, tableColumns: newColumns });
  };

  const clearInnerColumn = (e, i, index) => {
    const newColumns = [...newReportType.tableColumns];
    newColumns[index].columns[i] = { [i]: '' };
    setNewReportType({ ...newReportType, tableColumns: newColumns });
  };

  const removeSplitedColumn = i => {
    const newColumns = [...newReportType.tableColumns];
    newColumns[i] = '';
    setNewReportType({ ...newReportType, tableColumns: newColumns });
  };

  const addType = () => {
    dispatch(addReportType(newReportType));
    setNewReportType({
      type: '',
      saftyOrdinance: '',
      tableColumns: [''],
      machineType: '',
    });
    setShowTypeForm(false);
  };
  return (
    <Box
      padding="2em"
      bg="blackAlpha.50"
      borderRadius="5px"
      position="relative"
      mb="12px"
    >
      <Icon
        as={IoMdClose}
        cursor="pointer"
        position="absolute"
        top="3%"
        left="1%"
        onClick={() => setShowTypeForm(false)}
      />
      <Input
        mb="10px"
        name="type"
        placeholder="סוג התסקיר"
        value={newReportType.type}
        onChange={handleNewTypeChange}
      />
      <Input
        mb="10px"
        name="saftyOrdinance"
        placeholder="פקודת בטיחות"
        value={newReportType.saftyOrdinance}
        onChange={handleNewTypeChange}
      />
      <Select
        mb="10px"
        name="machineType"
        placeholder="סוג המכונה"
        value={newReportType.machineType}
        onChange={handleNewTypeChange}
      >
        <option value="מכונה">מכונה</option>
        <option value="אביזר הרמה">אביזר הרמה</option>
      </Select>
      <Text>עמודות בטבלה:</Text>

      {newReportType.tableColumns.map((column, index) =>
        typeof column !== 'object' ? (
          <InputGroup key={index}>
            <Input
              value={newReportType.tableColumns[index]}
              onChange={e =>
                inputChange(
                  e,
                  index,
                  newReportType,
                  setNewReportType,
                  'tableColumns'
                )
              }
              mb="10px"
            />
            {newReportType.tableColumns[index] !== '' && (
              <InputRightElement
                children={<IoMdClose />}
                cursor="pointer"
                onClick={() =>
                  removeInput(
                    newReportType,
                    setNewReportType,
                    'tableColumns',
                    index
                  )
                }
              />
            )}
          </InputGroup>
        ) : (
          <>
            <InputGroup key={index * 1000}>
              <Input
                placeholder="כותרת העמודה"
                mb="12px"
                value={column.columnTitle}
                onChange={e => changeColumnTitle(e, index)}
              />
              <InputRightElement
                children={<BsTrash />}
                onClick={() => removeSplitedColumn(index)}
              />
            </InputGroup>
            <Flex key={index} gap="8px">
              {column.columns.map((c, i) => (
                <InputGroup key={i * 100} flex={1}>
                  <Input
                    value={c[i]}
                    onChange={e => changeInnerColumn(e, i, index)}
                    mb="10px"
                  />
                  {newReportType.tableColumns[i] !== '' && (
                    <InputRightElement
                      children={<IoMdClose />}
                      cursor="pointer"
                      onClick={e => clearInnerColumn(e, i, index)}
                    />
                  )}
                </InputGroup>
              ))}
            </Flex>
          </>
        )
      )}
      <>
        <Button
          bg="blue.600"
          leftIcon={<IoMdAdd />}
          color="white"
          onClick={() =>
            addInput(newReportType, setNewReportType, 'tableColumns')
          }
          disabled={
            newReportType.tableColumns[
              newReportType.tableColumns.length - 1
            ] === ''
          }
        >
          הוסף עמודה
        </Button>
        <Button
          leftIcon={<IoMdAdd />}
          onClick={splitColumn}
          disabled={
            newReportType.tableColumns[
              newReportType.tableColumns.length - 1
            ] === ''
          }
        >
          הוסף עמודה מחולקת
        </Button>
      </>
      <Flex justifyContent="flex-end">
        <Button variant="outline" onClick={() => setShowTypeForm(false)}>
          ביטול
        </Button>
        <Button
          bg="blue.600"
          color="white"
          ml={3}
          display="flex"
          alignItems="center"
          gap="8px"
          onClick={addType}
          disabled={
            newReportType.type === '' ||
            newReportType.saftyOrdinance === '' ||
            newReportType.tableColumns === [''] ||
            loading
          }
        >
          <Text>שמור</Text>
          {loading && <Spinner size="sm" />}
        </Button>
      </Flex>
    </Box>
  );
}

export default AddReportType;
