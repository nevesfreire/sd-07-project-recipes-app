import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import TitleHeader from '../common/Header/components/TitleHeader';
import ProfileButton from '../common/Header/components/ProfileButton';

describe('Teste do Header.js', () => {
  it('Tem o data-testid page-title', () => {
    const { getByTestId } = renderWithRouter(<TitleHeader />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('Tem o data-testid profile-top-btn', () => {
    const { getByTestId } = renderWithRouter(<ProfileButton />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
});
