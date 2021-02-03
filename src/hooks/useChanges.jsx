import { useContext, useEffect } from 'react';
import context from '../contextAPI/context';

const useChanges = (target) => {
  const { state, setState } = useContext(context);
  
  const stateChanges = (name, value) => {
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    const { name, value } = target;
    stateChanges(name, value);
  })
  
  return () => setState({ ...state })
};

export default useChanges;
