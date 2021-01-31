import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, Button } from '../components';

export default function Explore() {
  const { push } = useHistory();

  return (
    <div>
      <Header title="Explorar" search={ false } />
      <Button
        testid="explore-food"
        text="Explorar Comidas"
        func={ () => { push('/explorar/comidas'); } }
      />
      <Button
        testid="explore-drinks"
        text="Explorar Bebidas"
        func={ () => { push('/explorar/bebidas'); } }
      />
      <Footer />
    </div>
  );
}
