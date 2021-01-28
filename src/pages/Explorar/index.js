import React, { Component } from 'react';
import { Header, Footer } from '../../components';

class Explorar extends Component {
  render() {
    const title = 'Explorar';
    return (
      <div>
        <Header title={ title } />
        <Footer />
      </div>
    );
  }
}

export default Explorar;
