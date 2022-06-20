import {
  Text,
  Flex,
  Wrap,
  WrapItem,
  Button,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Box,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { editCompany } from '../../../redux/actions/companies';

const CompanyTab = ({ company }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.companies);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [companyDetails, setCompanyDetails] = React.useState({
    name: '',
    city: '',
    address: '',
    zipCode: '',
    email: '',
    phone: '',
    fax: '',
  });
  const onChange = e => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };
  const submit = e => {
    e.preventDefault();
    const data = {
      name: companyDetails.name !== '' ? companyDetails.name : undefined,
      city: companyDetails.city !== '' ? companyDetails.city : undefined,
      address:
        companyDetails.address !== '' ? companyDetails.address : undefined,
      zipCode:
        companyDetails.zipCode !== '' ? companyDetails.zipCode : undefined,
      email: companyDetails.email !== '' ? companyDetails.email : undefined,
      phone: companyDetails.phone !== '' ? companyDetails.phone : undefined,
      fax: companyDetails.fax !== '' ? companyDetails.fax : undefined,
    };
    dispatch(editCompany(company._id, data));
    if(!loading) {
      onClose();
    }
  };
  return (
    <Wrap spacing="24px" position="relative">
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>עדכון פרטי החברה</DrawerHeader>
          <DrawerBody>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                שם:
              </Text>
              <Input
                placeholder={company.name}
                name="name"
                value={companyDetails.name}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                כתובת:
              </Text>
              <Input
                placeholder={company.address}
                name="address"
                value={companyDetails.address}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                עיר:
              </Text>
              <Input
                placeholder={company.city}
                name="city"
                value={companyDetails.city}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                מיקוד:
              </Text>
              <Input
                placeholder={company.zipCode}
                name="zipCode"
                value={companyDetails.zipCode}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                טלפון:
              </Text>
              <Input
                placeholder={company.phone}
                name="phone"
                value={companyDetails.phone}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                פקס:
              </Text>
              <Input
                placeholder={company.fax}
                name="fax"
                value={companyDetails.fax}
                onChange={onChange}
              />
            </Box>
            <Box mb="12px">
              <Text fontWeight="bold" mb="8px">
                דואר אלקטרוני:
              </Text>
              <Input
                placeholder={company.email}
                name="email"
                value={companyDetails.email}
                onChange={onChange}
              />
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
      <Button
        position="absolute"
        right="0"
        top="0"
        bg="blue.600"
        borderRadius="50%"
        width="45px"
        height="45px"
        _hover={{ bg: '#000' }}
        transition="all 0.2s"
        boxShadow="2px 2px 10px 1px rgba(0,0,0,0.2)"
        onClick={onOpen}
      >
        <Icon as={FiEdit2} color="#fff" w={5} h={5} />
      </Button>
      <WrapItem>
        <Flex direction="column" gap="12px">
          <Flex gap="12px">
            <Text fontWeight="bold">שם:</Text>
            <Text>{company.name}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">ח.פ.:</Text>
            <Text>{company.BN}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">כתובת:</Text>
            <Text>{company.address}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">עיר:</Text>
            <Text>{company.city}</Text>
          </Flex>
        </Flex>
      </WrapItem>
      <WrapItem>
        <Flex direction="column" gap="12px">
          <Flex gap="12px">
            <Text fontWeight="bold">מיקוד:</Text>
            <Text>{company.zipCode}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">טלפון:</Text>
            <Text>{company.phone}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">פקס:</Text>
            <Text>{company.fax ? company.fax : '-'}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">דואר אלקטרוני:</Text>
            <Text>{company.email ? company.email : '-'}</Text>
          </Flex>
        </Flex>
      </WrapItem>
    </Wrap>
  );
};

export default CompanyTab;
