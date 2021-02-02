import React from 'react';
import { Footer, Header } from '../../components';
import RequestData from '../../services/RequestAPI';
import Card from '../../components/Card';

async function ExploreByIngredient() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const list = await RequestData(URL);
  const zero = 0;
  const twelve = 12;
  const list12 = await list.meals.slice(zero, twelve);
  console.log(await list12);
  list12.map((e, k) => {
    const URL2 = `https://www.themealdb.com/images/ingredients/${ e.strIngredient}.png`;
    list12[k].thumb = URL2;
  });

  return (
    <div>
      <Header />
      { list12.map((e) => (
        <Card
          key={ e.idIngredient }
          name={ e.strIngredient }
          index={ e.idIngredient }
          id={ e.idIngredient }
          recipeType={ e.strDescription }
          thumb={ e.thumb }
        />)) }
      <Footer />
    </div>
  );
}

export default ExploreByIngredient;
