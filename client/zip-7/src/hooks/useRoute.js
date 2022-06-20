import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
export const useRoute = () => {
  const history = useHistory();
  const [route, setRoute] = useState('');

  useEffect(() => {
    setRoute(history.location.pathname.split('/')[history.location.pathname.split('/').length - 1]);
  }, [history.location.pathname]);
  return route;
};
