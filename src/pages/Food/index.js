import React, { useContext } from 'react';
import { Header, Footer, Cards } from '../../Components';
import FoodContext from '../../providers/Context/Context';
import './styles.css';

const Food = () => {
  const { data, categories, categoriesData, allButton } = useContext(FoodContext);

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
      <div className="buttons-category">
        { categories.map((categoryName) => (
          <button
            className="categories-button"
            id={ categoryName }
            data-testid={ `${categoryName}-category-filter` }
            key={ categoryName }
            type="button"
            onClick={ categoriesData }
          >
            {categoryName}
          </button>)) }
        <button
          className="categories-button"
          data-testid="All-category-filter"
          type="button"
          onClick={ allButton }
        >
          All
        </button>
      </div>
      <div className="all-cards">
        {renderCards()}
      </div>
      <Footer />
    </div>
  );
};

export default Food;
