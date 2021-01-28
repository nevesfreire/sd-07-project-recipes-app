import React, { Component } from 'react';
import { Header } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

class ExplorarBebidasIng extends Component {
  render() {
    const title = 'Explorar Ingredientes';
    return (
      <div>
        <Header title={ title } />
      </div>
    );
  }
}

export default ExplorarBebidasIng;
