import React, { useLayoutEffect } from 'react';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Box,
  Text,
  Flex,
  Button,
  Spinner,
  Checkbox,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, editContact } from '../../../redux/actions/companies';

const ContctDrawer = ({ contact, type, company, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.companies);
  const [isMaster, setIsMaster] = React.useState(false);
  const [contactDetails, setContactDetails] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
  });
  const submit = e => {
    e.preventDefault();
    let data = {
      firstName:
        contactDetails.firstName !== '' ? contactDetails.firstName : undefined,
      lastName:
        contactDetails.lastName !== '' ? contactDetails.lastName : undefined,
      email: contactDetails.email !== '' ? contactDetails.email : undefined,
      phone: contactDetails.phone !== '' ? contactDetails.phone : undefined,
      role: contactDetails.role !== '' ? contactDetails.role : undefined,
      isMasterContact: isMaster,
      companyId: company._id,
    };
    if (type === 'add') {
      data = { ...data, companyDetails: { BN: company.BN } };
      dispatch(addContact(data));
    } else {
      dispatch(editContact(contact._id, data));
    }
    if (!loading) {
      onClose();
    }
  };
  const onChange = e => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };
  useLayoutEffect(() => {
    if (company.primaryContact._id === contact?._id) {
      setIsMaster(true);
    }
  }, []);
  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {type === 'add' ? 'הוספת איש קשר' : 'עדכון איש קשר'}
        </DrawerHeader>
        <DrawerBody>
          <Box mb="12px">
            <Text fontWeight="bold" mb="8px">
              שם פרטי:
            </Text>
            <Input
              placeholder={type === 'edit' ? contact.firstName : ''}
              name="firstName"
              value={contactDetails.firstName}
              onChange={onChange}
            />
          </Box>
          <Box mb="12px">
            <Text fontWeight="bold" mb="8px">
              שם משפחה:
            </Text>
            <Input
              placeholder={type === 'edit' ? contact.lastName : ''}
              name="lastName"
              value={contactDetails.lastName}
              onChange={onChange}
            />
          </Box>
          <Box mb="12px">
            <Text fontWeight="bold" mb="8px">
              טלפון:
            </Text>
            <Input
              placeholder={type === 'edit' ? contact.phone : ''}
              name="phone"
              value={contactDetails.phone}
              onChange={onChange}
            />
          </Box>
          <Box mb="12px">
            <Text fontWeight="bold" mb="8px">
              דואר אלקטרוני{' '}
            </Text>
            <Input
              placeholder={type === 'edit' ? contact.email : ''}
              name="email"
              value={contactDetails.email}
              onChange={onChange}
            />
          </Box>
          <Checkbox
            isChecked={isMaster}
            onChange={() => setIsMaster(!isMaster)}
          >
            איש קשר ראשי
          </Checkbox>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            ביטול
          </Button>
          <Button colorScheme="blue" disabled={loading} onClick={submit}>
            <Flex gap="8px" alignItems="center">
              <Text>שמור</Text>
              {loading && <Spinner />}
            </Flex>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
};

export default ContctDrawer;
