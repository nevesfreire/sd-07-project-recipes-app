import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ExplorarComidasArea extends React.Component {
  render() {
    return (
      <div>
        <Header shouldRenderSearchIcon="yes" pageTitle="Explorar Origem" />
        <Footer />
      </div>
    );
  }
}

export default ExplorarComidasArea;
