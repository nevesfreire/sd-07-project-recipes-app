import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function useRedirect() {
  const [path, setPath] = useState();
  const history = useHistory();
  console.log(path);

  useEffect(() => {
    history.push(path);
  }, [history, path]);

  return [setPath];
}

export default useRedirect;
