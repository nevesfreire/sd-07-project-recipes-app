import React, { Component } from 'react';
import { CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';

export default class Explore extends Component {
  render() {
    return (
      <div>
        <CustomHeader title="Explorar" showSearchTopBtn={ false } />
        <CustomFooter />
      </div>
    );
  }
}
