import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { fetchAllFoodRecipes } from '../services/foodApiFunctions';
import { fetchDrinkDetailById } from '../services/drinkApiFunctions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './recipes.css';

const copy = require('clipboard-copy');

function DrinksDetails(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recomended, setRecomendedRecipes] = useState([]);

  const {
    drinkDetail,
    setDrinkDetail,
    setId,
    id,
  } = useContext(RecipesContext);

  const zero = 0;
  const six = 6;
  const fifty = 50;

  async function copyCliboard() {
    copy(`http://localhost:3000/bebidas/${id}`)
      .then(() => {
        alert('Link copiado!');
      });
  }

  const recomendedFood = async () => {
    const allFoods = await fetchAllFoodRecipes();
    const sixFoods = allFoods.meals.slice(zero, six);
    console.log(sixFoods);
    setRecomendedRecipes(sixFoods);
  };

  const recipesIngredients = () => {
    const allIngredients = [];
    for (let i = zero; i <= fifty; i += 1) {
      if (drinkDetail[`strIngredient${i}`]) {
        allIngredients.push(
          { nomeIngrediente: drinkDetail[`strIngredient${i}`],
            medida: drinkDetail[`strMeasure${i}`] },
        );
      }
    }

    setIngredients(allIngredients);
  };

  const randomId = async () => {
    const { match } = props;
    const { id } = match.params;
    setId(id);
    const details = await fetchDrinkDetailById(id);
    console.log('Console da receita', details);
    setDrinkDetail(details.drinks[0]);
  };

  useEffect(() => {
    // recomendedDrink();
    recomendedFood();
    randomId();
  }, []);

  useEffect(() => {
    recipesIngredients();
  }, [drinkDetail]);

  return (
    <div>
      {console.log(drinkDetail.idDrink)}
      <img
        data-testid="recipe-photo"
        alt="Imagem da comida"
        src={ drinkDetail.strDrinkThumb }
      />
      <h2
        data-testid="recipe-title"
      >
        {drinkDetail.strDrink}
      </h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyCliboard }
      >
        <img
          alt="imagem de compartilhamento"
          src={ shareIcon }
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img
          alt="imagem de coração(favoritar)"
          src={ whiteHeartIcon }
        />
      </button>
      <p
        data-testid="recipe-category"
      >
        {drinkDetail.strCategory}
      </p>
      <div>
        Ingredientes
        {
          ingredients.map(
            (item, index) => (
              <span
                key={ index }
              >
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${item.nomeIngrediente} ${item.medida}` }
                </p>
              </span>
            ),
          )
        }
      </div>
      <p
        data-testid="instructions"
      >
        {drinkDetail.strInstructions}
      </p>
      <div>
        Receitas recomendadas
        {
          recomended.map(
            (item, index) => (
              <span
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <img alt="recomendadas" src={ item.strMealThumb } />
              </span>
            ),
          )
        }
      </div>
      <Link to={ `/bebidas/${id}/in-progress` }>
        <button
          className="iniciarReceita"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar receita
        </button>
      </Link>
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DrinksDetails;
