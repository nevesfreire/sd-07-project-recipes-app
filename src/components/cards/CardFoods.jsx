import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeralContext from '../../context/GlobalContext';
import { twelve } from '../../services/numbers';
import './styles.css';

export default function Cards() {
  const { data } = useContext(GeralContext);
  const listOfCards = [];
  data.forEach(({ strMeal, strMealThumb, idMeal }, index) => {
    if (index < twelve) {
      listOfCards.push(
        <Link to={ `/comidas/${idMeal}` } key={ `${index}-recipe-card` }>
          <div
            className="card-container"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="card-img"
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ `Imagem da receita ${strMeal}` }
            />
            <div className="card-name">
              <span data-testid={ `${index}-card-name` }>
                {strMeal}
              </span>
            </div>
          </div>
        </Link>,
      );
    }
  });
  return listOfCards;
}
