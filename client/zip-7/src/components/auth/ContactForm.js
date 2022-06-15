import React from 'react';
import { Alert, AlertDescription, Flex, Input, Text } from '@chakra-ui/react';

const ContactForm = ({ contact, handleContactChange, errorMessage }) => {
  return (
    <>
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
      <Flex gap="8px" mb="15px" mt="10px">
        <Input
          placeholder="סיסמא"
          name="password"
          value={contact.password}
          onChange={handleContactChange}
          type="password"
        />
        <Input
          placeholder="אשר סיסמא"
          name="confirmPassword"
          type="password"
          value={contact.confirmPassword}
          onChange={handleContactChange}
        />
      </Flex>
     {errorMessage && <Alert status="error">
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>}
    </>
  );
};

export default ContactForm;
