import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useIngredients from '../hooks/useIngredients';
import { Item } from '../components';

function ExploreByIngredients({ location: { pathname } }) {
  const [ingredients, getIngredients] = useIngredients();
  const toSearchFor = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  useEffect(() => {
    getIngredients(toSearchFor);
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" isSearchable={ false } />
      { ingredients
        && ingredients.map(
          (ingredient) => (
            <Item
              key={ ingredient.id }
              index={ ingredient.id }
              name={ ingredient.name }
              imageSrc={ ingredient.image_src }
            />),
        )}
      <Footer />
    </div>
  );
}

ExploreByIngredients.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired }).isRequired,
};

export default ExploreByIngredients;
