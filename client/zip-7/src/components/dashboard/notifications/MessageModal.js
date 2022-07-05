import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  Textarea,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { sendNotification } from '../../../redux/actions/notifications';

const MessageModal = ({ show, setShow, recipient }) => {
  const [message, setMessage] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const { loading } = useSelector(state => state.notifications);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const submit = () => {
    const data = {
      from: user._id,
      to: recipient._id,
      subject,
      message,
    };
    dispatch(sendNotification(data));
  };
  return (
    <Modal isOpen={show} onClose={setShow}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> שלח הודעה ל{recipient.firstName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>נושא:</Text>
          <Input value={subject} onChange={e => setSubject(e.target.value)} />
          <Text mt="1em">הודעה:</Text>
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bg="blue.600"
            mr={3}
            color="white"
            onClick={submit}
            disabled={loading || message === ''}
          >
            שלח {loading && <Spinner ml="0.5em" />}
          </Button>
          <Button variant="ghost" onClick={setShow}>
            ביטול
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
