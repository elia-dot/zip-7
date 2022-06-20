import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Drawer,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

import ContactDrawer from './ContactDrawer';
import { removeContact } from '../../../redux/actions/companies';

const ContactTab = ({ company, contacts }) => {
  const [drawerType, setDrawerType] = React.useState('');
  const [editingContact, setEditingContact] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  if (!contacts) return <Box></Box>;
  return (
    <Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <ContactDrawer
          contact={editingContact}
          company={company}
          type={drawerType === 'add' ? 'add' : 'edit'}
          onClose={onClose}
        />
      </Drawer>
      {contacts.map((contact, i) => (
        <Box key={i}>
          <Flex gap="8px" alignItems="center" bg="gray.200" px="8px">
            <Icon
              as={FiEdit2}
              size="20px"
              color="blue.600"
              cursor="pointer"
              onClick={() => {
                setEditingContact(contact);
                setDrawerType('edit');
                onOpen();
              }}
            />
            <Text fontWeight="bold">איש קשר {i + 1}:</Text>
            <Icon
              as={BsTrash}
              size="20px"
              color="red.600"
              cursor="pointer"
              ml="auto"
              onClick={() => {
                dispatch(removeContact(contact._id));
              }}
            />
          </Flex>

          <Flex direction="column" gap="8px" py="12px">
            <Flex gap="12px">
              <Text fontWeight="bold">שם פרטי:</Text>
              <Text>{contact.firstName}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">שם משפחה:</Text>
              <Text>{contact.lastName}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">דואר אלקטרוני:</Text>
              <Text>{contact.email}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">טלפון:</Text>
              <Text>{contact.phone}</Text>
            </Flex>
          </Flex>
        </Box>
      ))}
      <Button
        bg="blue.500"
        onClick={() => {
          setDrawerType('add');
          onOpen();
        }}
      >
        <Flex gap="8px" alignItems="center">
          <Icon as={FiEdit2} size="20px" color="white" cursor="pointer" />
          <Text fontWeight="bold" color="white">
            הוסף איש קשר
          </Text>
        </Flex>
      </Button>
    </Box>
  );
};

export default ContactTab;
