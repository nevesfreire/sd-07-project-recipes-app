import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
import getPath from '../helpers/getPath';
import fetchData from '../services/fetchData';

function useSendRequestBtn() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const randonNumber = 0;
  const [getEvent, setGetEvent] = useState(randonNumber);
  const { filterData, setFilterData } = useContext(context);

  const myPath = getPath(pathname);

  useEffect(() => {
    fetchData(myPath, filterData, setFilterData);
  }, [getEvent]);

  return [setGetEvent];
}

export default useSendRequestBtn;
