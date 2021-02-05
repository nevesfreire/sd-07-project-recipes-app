import React from 'react';
// import { render, screen } from '@testing-library/react';
import ComidasID from '../pages/ComidasID/index';
import { renderWithRouterAndStore } from './helper/testConfig';
import storeMock from './helper/mock';

describe('[PÁGINA DE COMIDAR]: ', () => {
  test('rederiza pagina', async () => {
    const { getByText, history } = renderWithRouterAndStore(
      <ComidasID />,
      '/comidas/53026',
      storeMock,
    );
    history.push('/comidas/53026');
    const element = getByText(
      /Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG./,
    );

    // Wait for page to update with query text
    expect(element).toBeInTheDocument();
  });
});
