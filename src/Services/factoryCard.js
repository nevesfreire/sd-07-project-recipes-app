import React from 'react';
import { Card } from '../components';

export default function factoryCard(arr, number, drink = true) {
  if (!arr) return (<h1>Não encontrado!</h1>);
  const text = drink ? 'Drink' : 'Meal';
  const str = `str${text}`;
  const Thumb = `str${text}Thumb`;
  const id = `id${text}`;
  return arr.filter((_, index) => index < number)
    .map((element, i) => (
      <Card
        link={ `/comidas/${element[id]}` }
        title={ element[str] }
        img={ element[Thumb] }
        strAlcoholic={ element.strAlcoholic }
        key={ i }
      />
    ));
}
