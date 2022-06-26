import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const PickMachine = ({ isOpen, onClose, setReport, report }) => {
  const { machines } = useSelector(state => state.reports);

  const machineClick = machine => {
    setReport({
      ...report,
      machine: {
        model: machine.model,
        manufacturer: machine.manufacturer,
        serialNumber: machine.serialNumber,
        year: machine.year,
      },
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size= "2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>סוג</Th>
                  <Th>דגם</Th>
                  <Th>מס' סידורי</Th>
                  <Th>יצרן</Th>
                  <Th>שנת ייצור</Th>
                </Tr>
              </Thead>
              <Tbody>
                {machines.map(machine => (
                  <Tr
                    key={machine._id}
                    cursor="pointer"
                    _hover={{ bg: 'blue.50' }}
                    transition="all 0.2s"
                    onClick={() => machineClick(machine)}
                  >
                    <Td>{machine.type}</Td>
                    <Td>{machine.model}</Td>
                    <Td>{machine.serialNumber}</Td>
                    <Td>{machine.manufacturer}</Td>
                    <Td>{machine.year}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            ביטול
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PickMachine;
