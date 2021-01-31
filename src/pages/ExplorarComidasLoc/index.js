import React, { Component } from 'react';
import { HeaderS, Footer } from '../../components';

class ExplorarComidasLoc extends Component {
  render() {
    const title = 'Explorar Origem';
    return (
      <div>
        <HeaderS title={ title } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarComidasLoc;
