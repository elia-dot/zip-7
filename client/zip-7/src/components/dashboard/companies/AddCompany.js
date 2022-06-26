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
  Text,
  Input,
  Flex,
  Alert,
  AlertDescription,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany } from '../../../redux/actions/companies';

const AddCompany = ({ isOpen, onClose }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [company, setCompany] = useState({
    name: '',
    BN: '',
    address: '',
    city: '',
    zipCode: '',
    email: '',
    phone: '',
    fax: '',
  });
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const { error, loading } = useSelector(state => state.companies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error === 'Invalid email address') {
      setErrorMessage('נא הכנס דואר אלקטרוני תקין');
    }
    if (error === 'Company already exists') {
      setErrorMessage('לקוח כבר קיים במערכת');
    }
  }, [error]);

  const add = () => {
    const data = { ...company, contact };
    dispatch(addCompany(data));
    if (!error && !loading) {
      onClose();
    }
  };

  const handleCompanyChange = e => {
    const { target } = e;
    setCompany({ ...company, [target.name]: target.value });
  };

  const handleContactChange = e => {
    const { target } = e;
    setContact({ ...contact, [target.name]: target.value });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>הוספת חברה</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" fontSize="20px" mb="16px">
            פרטי החברה:
          </Text>
          <Flex gap="8px" mb="12px">
            <Input
              placeholder="שם החברה"
              name="name"
              value={company.name}
              onChange={handleCompanyChange}
              required
            />
            <Input
              placeholder="ח.פ."
              name="BN"
              value={company.BN}
              onChange={handleCompanyChange}
              required
            />
          </Flex>
          <Flex gap="8px" mb="12px">
            <Input
              placeholder="כתובת"
              name="address"
              value={company.address}
              onChange={handleCompanyChange}
              required
            />
            <Input
              placeholder="עיר"
              name="city"
              value={company.city}
              onChange={handleCompanyChange}
              required
            />
          </Flex>
          <Flex gap="8px" mb="12px">
            <Input
              placeholder="מיקוד"
              name="zipCode"
              value={company.zipCode}
              onChange={handleCompanyChange}
              required
            />
            <Input
              placeholder="דואר אלקטרוני"
              name="email"
              value={company.email}
              onChange={handleCompanyChange}
            />
          </Flex>
          <Flex gap="8px" mb="12px">
            <Input
              placeholder="טלפון"
              name="phone"
              value={company.phone}
              onChange={handleCompanyChange}
              required
            />
            <Input
              placeholder="פקס"
              name="fax"
              value={company.fax}
              onChange={handleCompanyChange}
            />
          </Flex>
          <Text fontWeight="bold" fontSize="20px" mb="16px">
            פרטי איש קשר:
          </Text>
          <Flex gap="8px" mb="15px" mt="10px">
            <Input
              placeholder="שם פרטי"
              name="firstName"
              value={contact.firstName}
              onChange={handleContactChange}
            />
            <Input
              placeholder="שם משפחה"
              name="lastName"
              value={contact.lastName}
              onChange={handleContactChange}
            />
          </Flex>
          <Flex gap="8px" mb="15px" mt="10px">
            <Input
              placeholder="טלפון"
              name="phone"
              value={contact.phone}
              onChange={handleContactChange}
            />
            <Input
              placeholder="דואר אלקטרוני"
              name="email"
              value={contact.email}
              onChange={handleContactChange}
            />
          </Flex>
          {errorMessage && (
            <Alert status="error">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={add}
            display="flex"
            alignItems="center"
            gap="8px"
            disabled={
              loading ||
              contact.firstName === '' ||
              contact.lastName === '' ||
              contact.email === '' ||
              contact.phone === '' ||
              company.BN === '' ||
              company.name === '' ||
              company.address === '' ||
              company.city === '' ||
              company.zipCode === '' ||
              company.phone === ''
            }
          >
            <Text>שמור</Text>
            {loading && <Spinner size="sm" />}
          </Button>
          <Button variant="outline" onClick={onClose}>
            ביטול
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCompany;
