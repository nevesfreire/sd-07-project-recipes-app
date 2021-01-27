import React, { Component } from 'react';
import { CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';

export default class DrinksIngredients extends Component {
  render() {
    return (
      <div>
        <CustomHeader
          title="
          Explorar Ingredientes"
          showSearchTopBtn={ false }
        />
        <CustomFooter />
      </div>
    );
  }
}
