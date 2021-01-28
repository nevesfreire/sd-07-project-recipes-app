import React, { Component } from 'react';
import { Header } from '../../components';

class ReceitasFavoritas extends Component {
  render() {
    const title = 'Receitas Favoritas';
    return (
      <div>
        <Header title={ title } />
      </div>
    );
  }
}

export default ReceitasFavoritas;
