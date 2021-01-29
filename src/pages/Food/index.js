import React, { useContext } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import FoodContext from '../../providers/Context/Context';
import Cards from '../../Components/Cards';

const Food = () => {
  const { data, categories, categoriesData } = useContext(FoodContext);

  const renderCards = () => {
    const maxLength = 12;
    const tweelveCards = data.filter((card, index) => index < maxLength);
    return tweelveCards.map((card, index) => (
      <Cards key={ index } index={ index } context="Comidas" card={ card } />
    ));
  };

  return (
    <div>
      <Header test="page-title">Comidas</Header>
      { categories.map((categoryName) => (
        <button
          id={ categoryName }
          data-testid={ `${categoryName}-category-filter` }
          key={ categoryName }
          type="button"
          onClick={ categoriesData }
        >
          {categoryName}
        </button>)) }
      {renderCards()}
      <Footer />
    </div>
  );
};

export default Food;
