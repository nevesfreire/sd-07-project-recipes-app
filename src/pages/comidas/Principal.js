import React, { Component } from 'react';
import Header from '../../components/header';

class Comidas extends Component {
  render() {
    return (
      <div>
        <Header title="Comidas" searchOn="on" />
      </div>
    );
  }
}

export default Comidas;
