import {
  Accordion,
  Box,
  Flex,
  Grid,
  Spinner,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { getMessages, readMessage } from '../../../redux/actions/notifications';

const MessagesTab = () => {
  const { messages, loading } = useSelector(state => state.notifications);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  console.log(messages);
  if (loading && messages.length === 0)
    return (
      <Grid placeContent="center" height="80vh">
        <Spinner
          width="30px"
          height="30px"
          color="blue.600"
          size="xl"
          thickness="4px"
          speed="0.65s"
        />
        <Text>טוען מידע...</Text>
      </Grid>
    );
  return (
    <>
      <Flex padding="16px">
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">תאריך:</Text>
        </Box>
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">שולח:</Text>
        </Box>
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">נושא:</Text>
        </Box>
        <Box flex={1}></Box>
      </Flex>
      <Accordion allowMultiple>
        {messages.map(message => (
          <AccordionItem key={message._id}>
            <AccordionButton
              bg={`${message.isRead ? 'white' : 'gray.100'}`}
              onClick={() => {
                if (message.isRead) return;
                dispatch(readMessage(message._id));
              }}
            >
              <Flex width="100%">
                <Box flex={3}>
                  <Text textAlign="center">
                    <Moment date={message.createdAt} format="DD/MM/YYYY" />
                  </Text>
                </Box>
                <Box flex={3}>
                  <Text textAlign="center">{`${message.from.firstName} ${message.from.lastName}`}</Text>
                </Box>
                <Box flex={3}>
                  <Text textAlign="center">{message.subject}</Text>
                </Box>
                <Box flex={1}></Box>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text> {message.message}</Text>
              <Button bg="blue.600" color="white" mt="12px">
                השב להודעה
              </Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default MessagesTab;
