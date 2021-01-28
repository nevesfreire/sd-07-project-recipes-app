import React, { Component } from 'react';
import { Header } from '../../components';

class ExplorarComidas extends Component {
  render() {
    const title = 'Explorar Comidas';
    return (
      <div>
        <Header title={ title } />
      </div>
    );
  }
}

export default ExplorarComidas;
