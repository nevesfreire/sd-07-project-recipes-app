import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function MainFood({ history }) {
  const cardsIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  console.log(cardsIndex);
  return (
    <div>
      <Header history={ history } title="Comidas" />
      <main>
        {
          cardsIndex.map(index => <RecipeCard key={index} id={index} />)
        }
      </main>
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
