import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, LoadingCard, NotFound } from '../Contructors';
import { useFetchApi } from '../../hooks';
import { CupNodesContext } from '../../contexts';
import { SUBMIT_SEARCH } from '../../reducers';

const getLink = (drink, key) => {
  const imgFoodURL = `https://www.themealdb.com/images/ingredients/${key}.png`;
  const imgDrinkURL = `https://www.themealdb.com/images/ingredients/${key}.png`;
  return drink ? imgFoodURL : imgDrinkURL;
};

const getTitle = (drink) => (drink ? 'bebidas' : 'Comidas');

export default function IngredientsCardsFactory({ number, URL, drink }) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const [loading, result] = useFetchApi(URL);
  const resultArr = drink ? result.drinks : result.meals;
  if (!loading && !resultArr) return (<NotFound />);
  const text = drink ? 'strIngredient1' : 'strIngredient';
  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : resultArr.filter((_, index) => index < number)
            .map((item, i) => (
              <Card
                title={ item[text] }
                img={ getLink(drink, item[text]) }
                key={ i }
                testidImg={ `${i}-ingredient-card` }
                testidCard={ `${i}-card-img` }
                testidTitle={ `${i}-card-name` }
                callback={ () => {
                  dispatchFilter({
                    type: SUBMIT_SEARCH,
                    payload: {
                      text: item[text], option: 'ingrediente', title: getTitle(drink),
                    },
                  });
                } }
              />
            ))
      }
    </div>
  );
}

IngredientsCardsFactory.defaultProps = {
  number: 12,
  drink: true,
};

IngredientsCardsFactory.propTypes = {
  number: PropTypes.number,
  URL: PropTypes.string.isRequired,
  drink: PropTypes.bool,
};
