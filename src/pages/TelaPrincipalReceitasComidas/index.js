import React, { Component } from 'react';
import { HeaderS } from '../../components';

class TelaPrincipalReceitasComidas extends Component {
  render() {
    const title = 'Comidas';
    return (
      <div>
        <HeaderS title={ title } />
      </div>
    );
  }
}

export default TelaPrincipalReceitasComidas;
