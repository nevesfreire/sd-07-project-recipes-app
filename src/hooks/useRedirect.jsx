import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextApi/context';

function useRedirect() {
  const [path, setPath] = useState();
  const { setState, state, email, password } = useContext(context);
  const history = useHistory();

  useEffect(() => {
    history.push(path);
    if (path === '/comidas') {
      setState({ ...state, credentials: [...state.credentials, { email, password }] });
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
    }
  }, [path]);

  return [setPath, path];
}

export default useRedirect;
