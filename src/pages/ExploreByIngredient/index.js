import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Footer, Header } from '../../components';
import RequestData from '../../services/RequestAPI';
import Card from '../../components/Card';

function ExploreByIngredient(props) {
  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);
  const isFood = pathname.indexOf('comidas') > -1;
  console.log(isFood);
  const isDrink = pathname.indexOf('bebidas') > -1;
  console.log(isDrink);
  let recipeType;
  if (isFood) { recipeType = 'comidas'; }
  if (isDrink) { recipeType = 'bebidas'; }
  const [data, setData] = useState([]);
  async function Request() {
    let URL;
    if (isFood) URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    if (isDrink) URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const list = await RequestData(URL);
    console.log(list);
    const zero = 0;
    const end = 12;
    let list12;
    if (isFood) { 
      list12 = await list.meals.slice(zero, end);
    }
  }

  Request();
  console.log(data);

  return (
    <div>
      <Header />
      {
        data
          ? data.map((element, key) => (
            <Card
              key={ key }
              name={ element.strIngredient }
              index={ key }
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
