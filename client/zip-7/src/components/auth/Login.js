import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Grid,
  Checkbox,
  Alert,
  AlertDescription,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../redux/actions/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, loading, error } = useSelector(state => state.auth);

  useLayoutEffect(() => {
    isAuth && history.push('/dashboard/reports');
  }, [isAuth, history]);

  useEffect(() => {
    if (error === 'User not found') {
      setErrorMsg('משתמש לא נמצא');
    }
    if (error === 'Incorrect password') {
      setErrorMsg('אחד מהפרטים שהוזנו לא נכונים');
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
        height="350"
        maxHeight="400"
        position="relative"
      >
        <Box
          position="absolute"
          bg="blue.600"
          px="20px"
          py="15px"
          top="-30px"
          borderRadius="2xl"
          left="20%"
          textAlign="center"
        >
          <Text color="#fff" fontWeight="bold">
            התחבר לחשבון שלך
          </Text>
          <Text color="#fff" fontSize="14px" mt="6px">
            להרשמה <Link to="/signup">לחץ כאן</Link>
          </Text>
        </Box>
        <Flex direction="column" gap={5} height="100%" justifyContent="center">
          <Input
            placeholder="דואר אלקטרוני"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="סיסמא"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
          />
          <Checkbox
            colorScheme="blue"
            onChange={() => setShowPassword(!showPassword)}
            value={showPassword}
          >
            הצג סיסמא
          </Checkbox>
          {errorMsg !== '' && (
            <Alert status="error">
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
          <Button
            bg="blue.600"
            textColor="white"
            onClick={() => dispatch(login({ email, password }))}
            disabled={email === '' || password === '' || loading}
          >
            היכנס
            {loading && <Spinner color="#fff" size="sm" marginStart="10px" />}
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
};

export default Login;
