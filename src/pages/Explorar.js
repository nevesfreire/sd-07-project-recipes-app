import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from './components/Header';
import Footer from '../../components/footer';

function Explorar(props) {
  const { history } = props;
  return (
    <div>
      <Header headerText="Explorar" showSearchButton="false" />
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
    </div>
  );
}

Explorar.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Explorar;
