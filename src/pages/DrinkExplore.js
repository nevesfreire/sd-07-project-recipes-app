import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Footer } from '../components';

export default function DrinkExplore() {
  const { push } = useHistory();
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
        func={ () => { push('/bebidas/random'); } }
      />
      <Footer />
    </div>
  );
}
