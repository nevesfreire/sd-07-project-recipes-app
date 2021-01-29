import React, { Component } from 'react';
import { Header, Footer } from '../../components';

class ExplorarComidas extends Component {
  render() {
    const title = 'Explorar Comidas';
    return (
      <div>
        <Header title={ title } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarComidas;
