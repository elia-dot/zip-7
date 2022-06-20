import { Grid, Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CompanyForm from './CompanyForm';
import ContactForm from './ContactForm';
import { signup } from '../../redux/actions/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth, error, loading } = useSelector(state => state.auth);
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1);
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
    password: '',
    confirmPassword: '',
  });

  const handleCompanyChange = e => {
    const { target } = e;
    setCompany({ ...company, [target.name]: target.value });
  };

  const handleContactChange = e => {
    const { target } = e;
    setContact({ ...contact, [target.name]: target.value });
  };

  const submit = () => {
    setErrorMessage('');
    if (contact.password !== contact.confirmPassword) {
      setErrorMessage('הסיסמאות אינן זהות');
      return;
    }
    const data = { ...contact, companyDetails: company };
    dispatch(signup(data));
  };
  useLayoutEffect(() => {
    isAuth && history.push('/dashboard/reports');
  }, [isAuth, history]);

  useEffect(() => {
    if (error === 'Invalid email address') {
      setErrorMessage('נא הכנס דואאר אלקטרוני תקין');
    }
    if (error === 'User already exists') {
      setErrorMessage('משתמש כבר קיים במערכת');
    }
  }, [error]);

  return (
    <Grid minH="100vh" placeContent="center">
      <Box
        px="40px"
        pt="70px"
        pb="40px"
        border="1px"
        borderColor="#000"
        borderRadius="2xl"
        position="relative"
        minHeight="430px"
        display="Flex"
        flexDirection="column"
      >
        <Box
          position="absolute"
          bg="blue.600"
          px="20px"
          py="15px"
          top="-30px"
          borderRadius="2xl"
          left="32%"
          textAlign="center"
        >
          <Text color="#fff" fontWeight="bold">
            הרשמה{' '}
          </Text>
          <Text color="#fff" fontSize="14px" mt="6px">
            להתחברות <Link to="/login">לחץ כאן</Link>
          </Text>
        </Box>
        {step === 1 && (
          <CompanyForm
            handleCompanyChange={handleCompanyChange}
            company={company}
          />
        )}
        {step === 2 && (
          <ContactForm
            handleContactChange={handleContactChange}
            contact={contact}
            errorMessage={errorMessage}
          />
        )}

        <Spacer />
        {step === 1 && (
          <Button
            bg="blue.600"
            textColor="#fff"
            w="100%"
            onClick={() => setStep(2)}
            disabled={
              company.BN === '' ||
              company.name === '' ||
              company.address === '' ||
              company.city === '' ||
              company.zipCode === '' ||
              company.phone === ''
            }
          >
            <Text>הבא</Text>
          </Button>
        )}
        {step === 2 && (
          <Flex gap="10px">
            <Button
              borderColor="blue.600"
              borderWidth="1px"
              textColor="blue.600"
              w="100%"
              mt="16px"
              onClick={() => setStep(1)}
            >
              <Text>הקודם</Text>
            </Button>
            <Button
              bg="blue.600"
              textColor="#fff"
              w="100%"
              mt="16px"
              disabled={
                loading ||
                contact.firstName === '' ||
                contact.lastName === '' ||
                contact.email === '' ||
                contact.phone === '' ||
                contact.password === '' ||
                contact.confirmPassword === ''
              }
              onClick={submit}
            >
              <Text>הירשם</Text>
            </Button>
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default Signup;
