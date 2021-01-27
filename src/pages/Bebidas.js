import React from 'react';
import Header from '../components/Header';

class Bebidas extends React.Component {
  render() {
    return (
      <div>
        <Header shouldRenderSearchIcon="yes" pageTitle="Bebidas" />
      </div>
    );
  }
}

export default Bebidas;
