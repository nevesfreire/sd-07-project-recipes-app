import React from 'react';
import { Spinner } from 'react-bootstrap';
import Footer from '../../pages/Footer';
import Header from '../Header';

export default function Loading({ headerTitle }) {
  return (
    <div>
      <Header title={ headerTitle } />
      <h2>
        Carregando...
        {' '}
        <Spinner
          as="span"
          animation="border"
          role="status"
        />
      </h2>
      <Footer />
    </div>
  );
}
