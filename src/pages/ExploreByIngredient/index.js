import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Footer, Header } from '../../components';
import RequestData from '../../services/RequestAPI';
import Card from '../../components/Card';

function ExploreByIngredient() {
  const index = -1;
  const isFood = useHistory().location.pathname.indexOf('comidas') > index;
  const isDrink = useHistory().location.pathname.indexOf('bebidas') > index;
  let recipeType;
  let link;
  let key;
  let keyCard;
  if (isFood) {
    recipeType = 'comidas';
    link = 'themealdb';
    key = 'meals';
    keyCard = 'strIngredient';
  }
  if (isDrink) {
    recipeType = 'bebidas';
    link = 'thecocktaildb';
    key = 'drinks';
    keyCard = 'strIngredient1';
  }
  const [data, setData] = useState([]);
  async function Request() {
    const URL = `https://www.${link}.com/api/json/v1/1/list.php?i=list`;
    const list = await RequestData(URL);
    // console.log(list);
    const zero = 0;
    const end = 12;
    const list12 = await list[key].slice(zero, end);
    // if (isFood) list12 = await list.meals.slice(zero, end);
    // if (isDrink) list12 = await list.drinks.slice(zero, end);
    list12.forEach((element, key2) => {
      if (isFood) list12[key2].thumb = `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png`;
      if (isDrink) list12[key2].thumb = `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png`;
    });
    setData(list12);
    console.log(list12);
  }

  useEffect(() => {
    Request();
  }, []);

  return (
    <div>
      <Header />
      {
        data
          ? data.map((element, key3) => (
            <Card
              data-testid={ key3 }
              key={ key3 }
              name={ element[keyCard] }
              index={ key3 }
              id={ element.idIngredient }
              recipeType={ recipeType }
              thumb={ element.thumb }
            />))
          : <span>Carregando</span>
      }

      <Footer />
    </div>
  );
}

export default ExploreByIngredient;
