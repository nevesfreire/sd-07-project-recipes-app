import React, { useContext } from 'react';
import CupNodesContext from '../../contexts/CupNodesContext';

export default function Options() {
  const { setValueOptions } = useContext(CupNodesContext);

  return (
    <div className="search-radio-gusta-css">
      <div>
        <label htmlFor="ingrediente">
          <input
            id="ingrediente"
            key="ingrediente"
            data-testid="ingredient-search-radio"
            type="radio"
            value="ingrediente"
            name="options"
            onChange={ () => setValueOptions('ingrediente') }
          />
          Ingrediente
        </label>
      </div>
      <div>
        <label htmlFor="nome">
          <input
            id="nome"
            key="nome"
            data-testid="name-search-radio"
            type="radio"
            value="nome"
            name="options"
            onChange={ () => setValueOptions('nome') }
          />
          Nome
        </label>
      </div>
      <div>
        <label htmlFor="primeiraLetra">
          <input
            id="primeiraLetra"
            key="primeiraLetra"
            data-testid="first-letter-search-radio"
            type="radio"
            value="primeiraLetra"
            name="options"
            onChange={ () => setOptionsValue('primeiraLetra') }
          />
          Primeira letra
        </label>
      </div>
    </div>
  );
}
