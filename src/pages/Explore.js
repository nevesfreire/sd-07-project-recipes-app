import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer, Button } from '../components';

export default function Explore({ history: { push } }) {
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

Explore.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
