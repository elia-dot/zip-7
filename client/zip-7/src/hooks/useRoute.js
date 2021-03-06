import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
export const useRoute = () => {
  const history = useHistory();
  const [route, setRoute] = useState('');

  useEffect(() => {
    if (history.location.pathname.includes('reports')) setRoute('reports');
    if (history.location.pathname.includes('clients')) setRoute('clients');
    if (history.location.pathname.includes('logs')) setRoute('logs');
    if (history.location.pathname.includes('reminders')) setRoute('reminders');
    if (history.location.pathname.includes('users')) setRoute('users');
    if (history.location.pathname.includes('invoices')) setRoute('invoices');
  }, [history.location.pathname]);
  return route;
};
