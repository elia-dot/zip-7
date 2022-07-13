import {
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Link,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useDisclosure,
  Spinner,
  Select,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleBlock, updateUser } from '../../redux/actions/users';
import MessageModal from '../dashboard/notifications/MessageModal';

const UserDetails = ({ match }) => {
  const [user, setUser] = useState(null);
  const [company, setompany] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const { users, loading } = useSelector(state => state.users);
  const { user: currentUser } = useSelector(state => state.auth);
  const { companies } = useSelector(state => state.companies);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: user?.role ? user.role : '',
  });
  const dispatch = useDispatch();

  const submit = e => {
    e.preventDefault();
    let data = {
      firstName:
        userDetails.firstName !== '' ? userDetails.firstName : undefined,
      lastName: userDetails.lastName !== '' ? userDetails.lastName : undefined,
      email: userDetails.email !== '' ? userDetails.email : undefined,
      phone: userDetails.phone !== '' ? userDetails.phone : undefined,
      role: userDetails.role !== '' ? userDetails.role : undefined,
    };
    dispatch(updateUser(user._id, data));
    if (!loading) onClose();
  };

  const onChange = e => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const closeModal = () => {
    setShowMessageModal(false);
  };

  useEffect(() => {
    const user = users.find(u => u._id === match.params.id);
    setUser(user);
  }, [users, match.params.id]);

  useEffect(() => {
    if (user) {
      const company = companies.find(
        c => c.contacts.filter(e => e._id === user._id).length > 0
      );
      setompany(company);
    }
  }, [companies, user]);

  if (!user) return null;
  return (
    <Box p="2em">
      {showMessageModal && (
        <MessageModal
          show={showMessageModal}
          setShow={closeModal}
          recipient={user}
        />
      )}
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>עדכון פרטי המשתמש</DrawerHeader>
          <DrawerBody>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                שם פרטי:
              </Text>
              <Input
                placeholder={user.firstName}
                name="firstName"
                value={userDetails.firstName}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                שם משפחה:
              </Text>
              <Input
                placeholder={user.lastName}
                name="lastName"
                value={userDetails.lastName}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                טלפון:
              </Text>
              <Input
                placeholder={user.phone}
                name="phone"
                value={userDetails.phone}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                דואר אלקטרוני{' '}
              </Text>
              <Input
                placeholder={user.email}
                name="email"
                value={userDetails.email}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                תפקיד{' '}
              </Text>
              <Select
                value={userDetails.role}
                onChange={e =>
                  setUserDetails({ ...userDetails, role: e.target.value })
                }
                name="role"
              >
                <option value="client">לקוח</option>
                <option value="user">משתמש</option>
                <option value="master">מנהל</option>
              </Select>
            </Box>
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
      </Drawer>
      <Wrap spacing="24px" position="relative">
        <WrapItem>
          <Flex direction="column" gap="12px">
            <Text fontWeight="bold" bg="gray.200" px="0.5em">
              פרטי משתמש:
            </Text>
            <Flex gap="12px">
              <Text fontWeight="bold">שם פרטי:</Text>
              <Text>{user.firstName}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">שם משפחה:</Text>
              <Text>{user.lastName}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">דואר אלקטרוני:</Text>
              <Text>{user.email}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">טלפון:</Text>
              <Text>{user.phone}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">תפקיד:</Text>
              <Text>
                {' '}
                {user.role === 'client' || user.role === 'contact'
                  ? 'לקוח'
                  : user.role === 'master'
                  ? 'מנהל'
                  : user.role === 'user'
                  ? 'משתמש'
                  : null}
              </Text>
            </Flex>
          </Flex>
        </WrapItem>
        {company && (
          <WrapItem>
            <Flex direction="column" gap="12px">
              <Text fontWeight="bold" bg="gray.200" px="0.5em">
                חברה:
              </Text>
              <Flex gap="12px">
                <Text fontWeight="bold">שם:</Text>
                <Text>{company.name}</Text>
              </Flex>
              <Flex gap="12px">
                <Text fontWeight="bold">ח.פ.:</Text>
                <Text>{company.BN}</Text>
              </Flex>
              <Flex gap="12px">
                <Text fontWeight="bold">טלפון:</Text>
                <Text>{company.phone}</Text>
              </Flex>
              <Flex gap="12px">
                <Link
                  as={RouterLink}
                  to={`/dashboard/clients/${company._id}`}
                  textDecoration="underline"
                  color="blue.600"
                  fontWeight="bold"
                >
                  עבור לדף החברה
                </Link>{' '}
              </Flex>
            </Flex>
          </WrapItem>
        )}
      </Wrap>
      <Flex gap="8px" mt="24px">
        {/* {currentUser._id !== user._id && (
          <Button
            bg="white"
            border="1px solid black"
            color="blue.600"
            onClick={() => setShowMessageModal(true)}
          >
            שלח הודעה
          </Button>
        )} */}
        <Button bg="blue.600" color="white" onClick={onOpen}>
          ערוך משתמש
        </Button>
        {currentUser.role === 'master' && user.role !== 'master' && (
          <Button
            bg="red.600"
            color="white"
            onClick={() => dispatch(toggleBlock(user._id))}
          >
            {user.blocked ? 'הסר חסימה' : 'חסום משתמש'}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default UserDetails;
