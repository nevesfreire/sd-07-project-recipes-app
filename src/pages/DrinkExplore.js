import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Footer } from '../components';
import { useFetchApi } from '../hooks';
import { getURL } from '../Services';

export default function DrinkExplore() {
  const { push } = useHistory();
  const URL = getURL({ id: 'random' });
  const [, { drinks }] = useFetchApi(URL) || {};

  const id = useMemo(() => {
    const [drinkObj] = drinks || [];
    const { idDrink } = drinkObj || { idDrink: '' };
    return idDrink;
  }, [drinks]);

  return (
    <div>
      <Header title="Explorar Bebidas" search={ false } />
      <Button
        testid="explore-by-ingredient"
        text="Por Ingredientes"
        func={ () => { push('/explorar/bebidas/ingredientes'); } }
      />
      <Button
        testid="explore-surprise"
        text="Me Surpreenda!"
        func={ () => { push(`/bebidas/${id}`); } }
      />
      <Footer />
    </div>
  );
}
