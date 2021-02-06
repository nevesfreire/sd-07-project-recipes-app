import { useEffect, useState } from 'react';

export default function useFetchApi(URL) {
  const [state, setResult] = useState({ loading: true, results: {} });

  useEffect(() => {
    (async () => {
      const response = await fetch(URL).then((element) => element.json())
        .catch((error) => { throw error; });
      setResult({ loading: false, results: response });
      return response;
    })();
  }, [URL]);

  const { loading, results } = state;
  return [loading, results];
}
