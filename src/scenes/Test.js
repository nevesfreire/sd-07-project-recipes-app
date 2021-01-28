import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchByFirstLetter } from '../services/API';

function App() {
  const [api, setApi] = useState({});
  console.log(api);

  const testFunc = async () => {
    const data = await searchByFirstLetter('654');
    setApi(data);
  };

  useEffect(() => {
    testFunc();
  }, []);

  if (api === {}) return setApi(searchByFirstLetter('654'));
  if (api !== {}) return <h1>cheio</h1>;

  return (
    <h1>vazio</h1>
  );
}

export default App;
