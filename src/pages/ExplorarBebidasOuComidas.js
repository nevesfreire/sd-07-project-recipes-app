import React from 'react';
import PropTypes from 'prop-types';
import ExplorarComida from '../components/ExplorarComida';
import ExplorarBebida from '../components/ExplorarBebida';

class ExplorarBebidasOuComidas extends React.Component {
  render() {
    const { location: { pathname } } = this.props;
    return (
      <div>
        {pathname === '/explorar/comidas' && <ExplorarComida />}
        {pathname === '/explorar/bebidas' && <ExplorarBebida />}
      </div>
    );
  }
}

ExplorarBebidasOuComidas.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default ExplorarBebidasOuComidas;
