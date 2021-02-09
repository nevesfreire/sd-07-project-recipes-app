import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeralContext from '../../context/GlobalContext';
import { twelve } from '../../services/numbers';
import './styles.css';

export default function Cards() {
  const { data } = useContext(GeralContext);
  const listOfCards = [];
  data.forEach(({ strDrink, strDrinkThumb, idDrink }, index) => {
    if (index < twelve) {
      listOfCards.push(
        <Link to={ `/bebidas/${idDrink}` } key={ `${index}-recipe-card` }>
          <div
            className="card-container"
            data-testid={ `${index}-recipe-card` }
          >
            <div className="card-name">
              <span data-testid={ `${index}-card-name` }>
                {strDrink}
              </span>
            </div>
            <img
              className="card-img"
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ `Imagem da receita ${strDrink}` }
            />
          </div>
        </Link>,
      );
    }
  });
  return listOfCards;
}
