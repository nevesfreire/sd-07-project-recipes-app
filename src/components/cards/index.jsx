import React from 'react';

export default function Cards(number, info) {
  const titleList = info.map((i) => i.strMeal);
  const imageList = info.map((i) => i.strMealThumb);
  const listOfCards = [];
  for (let index = 0; index < number; index += 1) {
    listOfCards.push(
      <div
        data-testid={ `${index}-recipe-card` }
        key={ `${index}-recipe-card` }
      >
        <span data-testid={ `${index}-card-name` }>
          {titleList[index]}
        </span>
        <img
          data-testid={ `${index}-card-img` }
          src={ imageList[index] }
          width="200px"
          alt={ `Imagem da receita ${titleList[index]}` }
        />
      </div>,
    );
  }
  return listOfCards;
}
