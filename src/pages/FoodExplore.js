import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Footer } from '../components';
import { useFetchApi } from '../hooks';
import { getURL } from '../Services';

export default function FoodExplore() {
  const { push } = useHistory();
  const URL = getURL({ id: 'random' }, false);
  const [, { meals }] = useFetchApi(URL) || {};

  const id = useMemo(() => {
    const [mealsObj] = meals || [];
    const { idMeal } = mealsObj || { idMeal: '' };
    return idMeal;
  }, [meals]);

  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <Button
        testid="explore-by-ingredient"
        text="Por Ingredientes"
        func={ () => { push('/explorar/comidas/ingredientes'); } }
      />
      <Button
        testid="explore-by-area"
        text="Por Local de Origem"
        func={ () => { push('/explorar/comidas/area'); } }
      />
      <Button
        testid="explore-surprise"
        text="Me Surpreenda!"
        func={ () => { push(`/comidas/${id}`); } }
      />
      <Footer />
    </div>
  );
}
