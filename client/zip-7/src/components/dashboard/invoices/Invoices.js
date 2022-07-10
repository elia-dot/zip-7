import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { icountGetClients } from '../../../redux/actions/icount';

const Invoices = () => {
  const dispatch = useDispatch();
  const { sessionId } = useSelector(state => state.icount);
  useEffect(() => {
    dispatch(icountGetClients({ sid: sessionId }));
  }, [dispatch]);
  return <div>Invoices</div>;
};

export default Invoices;
