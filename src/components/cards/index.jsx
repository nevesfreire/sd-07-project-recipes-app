import React from 'react';
import Styles from './Styles';

const { Content, Name, Image, NameContainer } = Styles;

export default function Cards(number, info) {
  const titleList = info.map((i) => i.name);
  const imageList = info.map((i) => i.image);
  const listOfCards = [];
  const zero = 0;
  for (let index = zero; index < number; index += 1) {
    listOfCards.push(
      <Content
        data-testid={ `${index}-recipe-card` }
        key={ `${index}-recipe-card` }
      >
        <Image
          data-testid={ `${index}-card-img` }
          src={ imageList[index] }
          alt={ `Imagem da receita ${titleList[index]}` }
        />
        <NameContainer>
          <Name data-testid={ `${index}-card-name` }>
            {titleList[index]}
          </Name>
        </NameContainer>
      </Content>,
    );
  }
  return listOfCards;
}
