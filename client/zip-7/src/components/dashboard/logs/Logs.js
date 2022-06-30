import { Spinner, Grid, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getLogs } from '../../../redux/actions/logs';

const Logs = () => {
  const dispatch = useDispatch();
  const { logs, loading } = useSelector(state => state.logs);

  console.log(logs);

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

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
  return <></>;
};

export default Logs;
