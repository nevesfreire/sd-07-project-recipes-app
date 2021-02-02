import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, LoadingCard, NotFound } from '../Contructors';
import { useFetchApi } from '../../hooks';
import { CupNodesContext } from '../../contexts';
import { SUBMIT_SEARCH } from '../../reducers';
import { UperCaseFirstLetter } from '../../Services';

const getURLImg = (drink, key) => {
  const imgFoodURL = `https://www.themealdb.com/images/ingredients/${key}.png`;
  const imgDrinkURL = `https://www.themealdb.com/images/ingredients/${key}.png`;
  return drink ? imgFoodURL : imgDrinkURL;
};

const getURL = (drink) => {
  const foodURL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return drink ? drinkURL : foodURL;
};

const getTitle = (drink) => (drink ? 'bebidas' : 'comidas');

export default function IngredientsCardsFactory({ number, drink }) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const URL = getURL(drink);
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
                img={ getURLImg(drink, item[text]) }
                key={ i }
                link={ `/${getTitle(drink)}` }
                testidImg={ `${i}-ingredient-card` }
                testidCard={ `${i}-card-img` }
                testidTitle={ `${i}-card-name` }
                callback={ () => {
                  dispatchFilter({
                    type: SUBMIT_SEARCH,
                    payload: {
                      text: item[text],
                      option: 'ingrediente',
                      title: UperCaseFirstLetter(getTitle(drink)),
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
  drink: PropTypes.bool,
};
