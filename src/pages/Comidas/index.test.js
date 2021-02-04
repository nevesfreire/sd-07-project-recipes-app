import React from 'react';
// import { render, screen } from '@testing-library/react';
import Comidas from './index';
import { renderWithRouterAndStore } from '../../test/testConfig';
import storeMock from '../../test/mock';

describe('[PÁGINA DE COMIDAR]: ', () => {
  test('rederiza pagina', async () => {
    const { getByText, history } = renderWithRouterAndStore(
      <Comidas />,
      '',
      storeMock,
    );
    const element = getByText(/Corba/);

    // Wait for page to update with query text
    expect(element).toBeInTheDocument();
  });
});
