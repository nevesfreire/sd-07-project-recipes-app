import { useContext } from 'react';
import context from '../contextAPI/context';

const stateChanges = ({ target: { name, value } }) => {
  const { state, setState } = useContext(context); 
  setState({ ...state, [name]: value });
};

export default stateChanges;
