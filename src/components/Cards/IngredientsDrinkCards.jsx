import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import LoadingCard from './LoadingCard';
import { useFetchApi } from '../../hooks';
import { CupNodesContext } from '../../contexts';
import { SUBMIT_SEARCH } from '../../reducers';

export default function IngredientsDrinkCards({ number }) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : drinks.filter((_, index) => index < number)
            .map(({ strIngredient1 }, i) => (
              <Card
                title={ strIngredient1 }
                img={ `https://www.themealdb.com/images/ingredients/${strIngredient1}.png` }
                key={ i }
                testidImg={ `${i}-ingredient-card` }
                testidCard={ `${i}-card-img` }
                testidTitle={ `${i}-card-name` }
                callback={ () => {
                  dispatchFilter({
                    type: SUBMIT_SEARCH,
                    payload: {
                      text: strIngredient1, option: 'ingrediente', title: 'bebidas',
                    },
                  });
                } }
              />
            ))
      }
    </div>
  );
}

IngredientsDrinkCards.defaultProps = {
  number: 12,
};

IngredientsDrinkCards.propTypes = {
  number: PropTypes.number,
};
