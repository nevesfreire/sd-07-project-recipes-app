import React, { Component } from 'react';
import { Header } from '../../components';

class ReceitasFeitas extends Component {
  render() {
    const title = 'Receitas Feitas';
    return (
      <div>
        <Header title={ title } />
      </div>
    );
  }
}

export default ReceitasFeitas;
