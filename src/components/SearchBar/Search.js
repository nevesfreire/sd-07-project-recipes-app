import React, { useContext } from 'react';
import CupNodesContext from '../../contexts/CupNodesContext';

export default function Search() {
  const { setSearchValue } = useContext(CupNodesContext);

  return (
    <input
      data-testid="search-input"
      className="search-input-gusta"
      type="text"
      onChange={ (event) => setSearchValue(event.target.value) }
    />
  );
}
