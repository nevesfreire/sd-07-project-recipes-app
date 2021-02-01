import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import LoadingCard from './LoadingCard';
import { useFetchApi } from '../../hooks';
import { CupNodesContext } from '../../contexts';
import { SUBMIT_SEARCH } from '../../reducers';

export default function IngredientsFoodCards({ number }) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const [loading, { meals }] = useFetchApi(URL);
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : meals.filter((_, index) => index < number)
            .map(({ strIngredient }, i) => (
              <Card
                link="/comidas"
                title={ strIngredient }
                img={ `https://www.themealdb.com/images/ingredients/${strIngredient}.png` }
                key={ i }
                testidImg={ `${i}-ingredient-card` }
                testidCard={ `${i}-card-img` }
                testidTitle={ `${i}-card-name` }
                callback={ () => {
                  dispatchFilter({
                    type: SUBMIT_SEARCH,
                    payload: {
                      text: strIngredient, option: 'ingrediente', title: 'Comidas',
                    },
                  });
                } }
              />
            ))
      }
    </div>
  );
}

IngredientsFoodCards.defaultProps = {
  number: 12,
};

IngredientsFoodCards.propTypes = {
  number: PropTypes.number,
};
