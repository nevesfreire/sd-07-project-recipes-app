import React from 'react';
import { useHistory } from 'react-router-dom';
import TitleHeader from './components/TitleHeader';
import ProfileButton from './components/ProfileButton';
import SearchButton from './components/SearchButton';

export default function Header() {
  const { pathname } = useHistory().location;

  return (
    <div>
      <div>
        <TitleHeader pathname={ pathname } />
      </div>

      <div>
        <ProfileButton />
      </div>

      <div>
        <SearchButton pathname={ pathname } />
      </div>
    </div>
  );
}
