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
    const zero = 0;
    const end = 12;
    // for (let i = list[key].length - 1; i >= 0; i = i -1) {
    //   if (list[key][i][keyCard].indexOf(' ') > 0) {
    //     list[key].splice(i,1)
    //   }
    // }
    await list[key].forEach((element) => {
      element.thumb = `https://www.${link}.com/images/ingredients/${element[keyCard]}-Small.png`;
      // console.log(element.thumb)
    });
    const list12 = await list[key].slice(zero, end);
    await setData(list12);
  }

  useEffect(() => {
    Request();
  }, []);

  return (
    <div>
      <Header />
      {
        data
          ? data.map((element3, key3) => (
            <Card
              name={ element3[keyCard] }
              thumb={ element3.thumb }
              id={ element3[keyCard] }
              recipeType={ recipeType }
              testIdCard={ `${key3}-card-name` }
              testIdThumb={ `${key3}-card-img` }
              testIdTitle={ `${key3}-ingredient-card` }
              key={ key3 }
            />))
          : <span>Carregando</span>
      }

      <Footer />
    </div>
  );
}

export default ExploreByIngredient;
