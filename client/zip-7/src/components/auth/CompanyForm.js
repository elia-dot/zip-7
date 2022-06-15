import { Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';

const CompanyForm = ({ company, handleCompanyChange }) => {
  return (
    <>
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
    </>
  );
};

export default CompanyForm;
