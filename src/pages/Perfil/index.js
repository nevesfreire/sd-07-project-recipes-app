import React, { Component } from 'react';
import { Header } from '../../components';

class Perfil extends Component {
  render() {
    const title = 'Perfil';
    return (
      <div>
        <Header title={ title } />
      </div>
    );
  }
}

export default Perfil;
