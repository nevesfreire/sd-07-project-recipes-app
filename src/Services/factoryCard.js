import React from 'react';
import { Card } from '../components';

function factoryCard(arr, number, drink, parameters) {
  if (!arr) return (<h1>Não encontrado!</h1>);
  const text = drink ? 'Drink' : 'Meal';
  const str = `str${text}`;
  const Thumb = `str${text}Thumb`;
  const id = `id${text}`;
  return arr.filter((_, index) => index < number)
    .map((element, i) => (
      <Card
        key={ i }
        title={ element[str] }
        img={ element[Thumb] }
        testidImg={ parameters ? `${i}${parameters.testidImg}` : `${i}-card-img` }
        testidCard={ parameters ? `${i}${parameters.testidCard}` : `${i}-recipe-card` }
        testidTitle={ parameters ? `${i}${parameters.testidTitle}` : `${i}-card-name` }
        link={ `/${text === 'Drink' ? 'bebidas' : 'comidas'}/${element[id]}` }
      />
    ));
}

export default factoryCard;
