import React from 'react';
import Header2 from '../../components/header/Header2';

class ReceitasFeitas extends React.Component {
  render() {
    return (
      <div>
        <Header2 title="Receitas Feitas" />
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
    );
  }
}

export default ReceitasFeitas;
