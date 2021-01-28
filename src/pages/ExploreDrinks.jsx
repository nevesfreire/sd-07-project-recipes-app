import React, { Component } from 'react';
import { CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';

export default class ExploreDrinks extends Component {
  render() {
    return (
      <div>
        <CustomHeader
          title="Explorar Bebidas"
          showSearchTopBtn={ false }
        />
        <CustomFooter />
      </div>
    );
  }
}
