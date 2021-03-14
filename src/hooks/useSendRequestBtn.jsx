import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
import getPath from '../helpers/getPath';
import startCountdown from '../helpers/startCountdown';
import fetchData from '../helpers/fetchData';

function useSendRequestBtn() {
  const isOver = 0;
  const history = useHistory();
  const { location: { pathname } } = history;
  const randonNumber = 0;
  const [getEvent, setGetEvent] = useState(randonNumber);
  const { state, setState, setActive } = useContext(context);

  const myPath = getPath(pathname);

  useEffect(() => {
    if (getEvent > isOver) startCountdown(setActive);

    fetchData(state, setState, myPath);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEvent]);

  return [setGetEvent];
}

export default useSendRequestBtn;
