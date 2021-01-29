import React from 'react';

class TelaReceitasFeitas extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        {/* <img data-testid="${index}-horizontal-image" src="" />
      <h4 data-testid="${index}-horizontal-toh4-text">Categorias</h4>
      <h3 data-testid="${index}-horizontal-name">Nome da receita</h3>
      <input type="date" data-testid="${index}-horizontal-done-date" />
      <button
        type="button"
        data-testid="${index}-horizontal-share-btn"
      >
        Compartilhar
      </button> */}
        {/*  As tags da receita devem possuir o
      atributo data-testid=${index}-${tagName}-horizontal-tag; */}

      </div>);
  }
}

export default TelaReceitasFeitas;
