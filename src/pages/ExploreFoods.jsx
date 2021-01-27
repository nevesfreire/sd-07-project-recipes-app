import React, { Component } from 'react';
import { CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';

export default class ExploreFoods extends Component {
  render() {
    return (
      <div>
        <CustomHeader title="Explorar Comidas" />
        <CustomFooter />
      </div>
    );
  }
}
