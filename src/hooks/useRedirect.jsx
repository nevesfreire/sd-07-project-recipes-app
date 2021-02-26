import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function useRedirect() {
  const [path, setPath] = useState();
  const history = useHistory();

  useEffect(() => {
    history.push(path);
  }, [path]);

  return [setPath];
}

export default useRedirect;
