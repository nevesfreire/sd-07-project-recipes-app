import React from 'react';
import PropTypes from 'prop-types';
import IngredientesComida from '../components/IngredientesComida';
import IngredientesBebidas from '../components/IngredientesBebidas';

class Ingredientes extends React.Component {
  render() {
    const { location: { pathname } } = this.props;
    return (
      <div>
        {pathname === '/explorar/comidas/ingredientes' && <IngredientesComida />}
        {pathname === '/explorar/bebidas/ingredientes' && <IngredientesBebidas />}
      </div>
    );
  }
}
Ingredientes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.func.isRequired }).isRequired,
};

export default Ingredientes;
