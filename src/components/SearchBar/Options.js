import React, { useContext } from 'react';
import CupNodesContext from '../../contexts/CupNodesContext';

export default function Options() {
  const { setValueOptions } = useContext(CupNodesContext);

  return (
    <div className="search-radio-gusta-css">
      <div>
        <input
          id="ingrediente"
          key="ingrediente"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingrediente"
          name="options"
          onChange={ () => setValueOptions('ingrediente') }
        />
        <label htmlFor="ingrediente">Ingrediente</label>
      </div>
      <div>
        <input
          id="nome"
          key="nome"
          data-testid="name-search-radio"
          type="radio"
          value="nome"
          name="options"
          onChange={ () => setValueOptions('nome') }
        />
        <label htmlFor="nome">Nome</label>
      </div>
      <div>
        <input
          id="primeiraLetra"
          key="primeiraLetra"
          data-testid="first-letter-search-radio"
          type="radio"
          value="primeiraLetra"
          name="options"
          onChange={ () => setOptionsValue('primeiraLetra') }
        />
        <label htmlFor="primeiraLetra">Primeira letra</label>
      </div>
    </div>
  );
}
