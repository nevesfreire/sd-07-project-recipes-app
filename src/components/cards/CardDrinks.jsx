import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeralContext from '../../context/GlobalContext';
import Styles from './Styles';
import { twelve } from '../../services/numbers';

const { Content, Image, NameContainer, Name } = Styles;
export default function Cards() {
  const { data } = useContext(GeralContext);
  const listOfCards = [];
  data.forEach(({ strDrink, strDrinkThumb, idDrink }, index) => {
    if (index < twelve) {
      listOfCards.push(
        <Link to={ `/bebidas/${idDrink}` } key={ `${index}-recipe-card` }>
          <Content
            data-testid={ `${index}-recipe-card` }
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
          </Content>
        </Link>,
      );
    }
  });
  return listOfCards;
}
