import React, { Component } from 'react';
import { CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <CustomHeader title="Perfil" />
        <CustomFooter />
      </div>
    );
  }
}
