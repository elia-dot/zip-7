import { Text, Link, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const logText = log => {
  if (log.action === 'login') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        התחבר למערכת
      </Flex>
    );
  }

  if (log.action === 'signup') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        יצר חשבון חדש
      </Flex>
    );
  }

  if (log.action === 'create company') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        יצר{' '}
        <Link
          as={RouterLink}
          to={`/dashboard/clients/${log.actionOn.company._id}`}
          textDecoration="underline"
          color="blue.600"
          fontWeight="bold"
        >
          חברה
        </Link>{' '}
        חדשה
      </Flex>
    );
  }

  if (log.action === 'create report') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        יצר{' '}
        <Link
          as={RouterLink}
          to={`/dashboard/reports/${log.actionOn.report._id}`}
          textDecoration="underline"
          color="blue.600"
          fontWeight="bold"
        >
          תסקיר
        </Link>{' '}
        חדש
      </Flex>
    );
  }

  if (log.action === 'update report') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        ערך פרטי
        <Link
          as={RouterLink}
          to={`/dashboard/reports/${log.actionOn.report._id}`}
          textDecoration="underline"
          color="blue.600"
          fontWeight="bold"
        >
          תסקיר
        </Link>{' '}
      </Flex>
    );
  }

  if (log.action === 'update company') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        ערך פרטי
        <Link
          as={RouterLink}
          to={`/dashboard/clients/${log.actionOn.company._id}`}
          textDecoration="underline"
          color="blue.600"
          fontWeight="bold"
        >
          {'חברה '}
        </Link>{' '}
      </Flex>
    );
  }

  if (log.action === 'block user') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        חסם
        <Link
          as={RouterLink}
          to={`/dashboard/users/${log.actionOn.user._id}`}
          textDecoration="underline"
          color="blue.600"
          fontWeight="bold"
        >
          משתמש
        </Link>{' '}
      </Flex>
    );
  }

  if (log.action === 'unblock user') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        הסיר חסימת
        <Link
          as={RouterLink}
          to={`/dashboard/users/${log.actionOn.user._id}`}
          textDecoration="underline"
          color="blue.600"
          fontWeight="bold"
        >
          משתמש
        </Link>{' '}
      </Flex>
    );
  }

  if (log.action === 'update user') {
    return (
      <Flex gap="6px">
        <Link as={RouterLink} to={`/dashboard/users/${log.creator._id}`}>
          {log.creator.firstName}
        </Link>{' '}
        ערך פרטי
        <Link
          as={RouterLink}
          to={`/dashboard/users/${log.actionOn.user._id}`}
          textDecoration="underline"
          color="blue.600"
          fontWeight="bold"
        >
          משתמש
        </Link>{' '}
      </Flex>
    );
  }
};

export default logText;
