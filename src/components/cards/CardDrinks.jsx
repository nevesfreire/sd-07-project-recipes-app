import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeralContext from '../../context/GlobalContext';
import Styles from './Styles';

const { Content, Image, NameContainer, Name } = Styles;

export default function Cards() {
  const { data } = useContext(GeralContext);

  const listOfCards = [];
  const maxNumberCard = 12;
  data.forEach(({ strDrink, strDrinkThumb }, index) => {
    if (index < maxNumberCard) {
      listOfCards.push(
        <Content
          data-testid={ `${index}-recipe-card` }
          key={ `${index}-recipe-card` }
        >
          <Image
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ `Imagem da receita ${strDrink}` }
          />
          <NameContainer>
            <Name data-testid={ `${index}-card-name` }>
              {strDrink}
            </Name>
          </NameContainer>
        </Content>,
      );
    }
      </Link>,
    );
          });
  return listOfCards;
}
