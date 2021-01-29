import React, { useContext } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { DrinkContext } from '../../providers/DrinkProvider';
import Cards from '../../Components/Cards';

const Drink = () => {
  const { data, categoriesButtom } = useContext(DrinkContext);

  const renderCards = () => {
    const maxLength = 12;
    const tweelveCards = data.filter((card, index) => index < maxLength);
    return tweelveCards.map((card, index) => (
      <Cards key={ index } index={ index } context="Bebidas" card={ card } />
    ));
  };

  return (
    <div>
      <Header>Bebidas</Header>
      { categoriesButtom.map((categoryName) => (
        <button
          data-testid={ `${categoryName}-category-filter` }
          key={ categoryName }
          type="button"
        >
          {categoryName}
        </button>)) }
      {renderCards()}
      <Footer />
    </div>
  );
};

export default Drink;
