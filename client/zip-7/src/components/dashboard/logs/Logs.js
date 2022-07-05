import { Spinner, Grid, Text, Box, Flex, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { getLogs } from '../../../redux/actions/logs';
import logText from './logText';

const Logs = () => {
  const dispatch = useDispatch();
  const { logs, loading } = useSelector(state => state.logs);
  const [logsByDate, setLogsByDate] = useState({});
  const [showLogs, setShowLogs] = useState('all');

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  const isToday = date => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    return date === todayString;
  };

  const isYesterday = date => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    return date === yesterdayString;
  };

  const isFromThePastWeek = date => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoString = weekAgo.toISOString().split('T')[0];
    return date >= weekAgoString;
  };

  useEffect(() => {
    const logByDate = {};
    const filteredLogs = logs.filter(log => {
      const date = log.createdAt.split('T')[0];
      if (showLogs === 'all') return true;
      if (showLogs === 'today') return isToday(date);
      if (showLogs === 'week') return isFromThePastWeek(date);
      return false;
    });
    filteredLogs.reverse().forEach(log => {
      let date = log.createdAt.split('T')[0];
      if (isToday(date)) {
        date = 'היום';
      }
      if (isYesterday(date)) {
        date = 'אתמול';
      }
      if (!logByDate[date]) {
        logByDate[date] = [];
      }
      logByDate[date].push(log);
    });
    setLogsByDate(logByDate);
  }, [logs, showLogs]);

  if (loading && logs.length === 0)
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
    <Box padding="2em 0">
      <Flex alignItems="center" gap="12px" p="1em">
        <Text fontSize="md">הראה פעילות:</Text>
        <Select
          w="150px"
          value={showLogs}
          onChange={e => setShowLogs(e.target.value)}
        >
          <option value="all">כל הפעילות</option>
          <option value="today">מהיום</option>
          <option value="week">מהשבוע האחרון</option>
        </Select>
      </Flex>
      {Object.keys(logsByDate).map(date => (
        <Box key={date}>
          <Text
            fontSize="md"
            fontWeight="w600"
            width="100%"
            bg="gray.100"
            px="1em"
          >
            {date === 'היום' || date === 'אתמול' ? (
              date
            ) : (
              <Moment date={date} format="DD/MM/YYYY" />
            )}
          </Text>
          <Box p="1em">
            {logsByDate[date].map(log => (
              <Flex key={log._id} gap="12px" mb="0.3em">
                <Text fontWeight="bold">
                  <Moment date={log.createdAt} format="HH:mm" />:
                </Text>
                <Text>{logText(log)}</Text>
              </Flex>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Logs;
