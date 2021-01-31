import React from 'react';
import './Styles.css';

export default function Cards(number, info) {
  const titleList = info.map((i) => i.name);
  const imageList = info.map((i) => i.image);
  const listOfCards = [];
  const zero = 0;
  for (let index = zero; index < number; index += 1) {
    listOfCards.push(
      <div
        className="cards-container"
        data-testid={ `${index}-recipe-card` }
        key={ `${index}-recipe-card` }
      >
        <img
          className="cards-img"
          data-testid={ `${index}-card-img` }
          src={ imageList[index] }
          alt={ `Imagem da receita ${titleList[index]}` }
        />
        <div className="cards-name-container">
<<<<<<< HEAD
          <div className="cards-name" data-testid={ `${index}-card-name` }>
            {titleList[index]}
          </div>
=======
          <span className="cards-name" data-testid={ `${index}-card-name` }>
            {titleList[index]}
          </span>
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622
        </div>
      </div>,
    );
  }
  return listOfCards;
}
