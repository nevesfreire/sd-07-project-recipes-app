import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import shareImg from '../../images/shareIcon.svg';
import {
  inicializateInProgress,
  insertOrRemoveIngredient,
  ingredientList,
} from '../../services/saveLocal';
import FavBtn from '../../common/FavBtn';
import { mealById, drinkById } from '../../services/API';
import './style.css';

const ReceitaEmProgresso = () => {
  const history = useHistory();
  const [mainData, setMainData] = useState({});
  const [copyOK, setCopyOK] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [listIngredient, setListIngredient] = useState([]);
  const { pathname } = history.location;
  const { id } = useParams();
  const mainFunction = pathname.includes('comida') ? mealById : drinkById;
  const type = mainFunction === mealById ? 'meals' : 'cocktails';
  const ingredients = Object.keys(mainData)
    .filter((e) => e.includes('strIngredient')
    && mainData[e] !== null && mainData[e] !== '');
  const mapOl = (e, i) => (
    <li key={ i } data-testid={ `${i}-ingredient-step` }>
      <label
        htmlFor={ mainData[e] }
      >
        <input
          type="checkbox"
          value={ mainData[e] }
          id={ mainData[e] }
          onChange={ ({ target }) => {
            insertOrRemoveIngredient(type, id, target.value);
            setListIngredient(ingredientList(type, id));
          } }
          checked={ listIngredient ? listIngredient.includes(mainData[e]) : false }
        />
        { mainData[e] }
      </label>
    </li>);
  useEffect(() => {
    const getData = async () => {
      const data = await mainFunction(id);
      setMainData(data);
      setIsLoading(false);
      inicializateInProgress(type, id);
      setListIngredient(ingredientList(type, id));
    };
    getData();
  }, [id, mainFunction, type]);

  if (!isloading) {
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={
            mainFunction === mealById ? mainData.strMealThumb : mainData.strDrinkThumb
          }
          alt="food or drink"
        />
        <h1 data-testid="recipe-title">
          {
            mainFunction === mealById ? mainData.strMeal : mainData.strDrink
          }
        </h1>
        <button
          type="button"
          onClick={ () => {
            copy(window.location.href)
              .then(() => setCopyOK(true));
          } }
        >
          <img data-testid="share-btn" src={ shareImg } alt="compartilhar" />
        </button>
        <h5>{copyOK && 'Link copiado!'}</h5>
        <FavBtn
          mainData={ mainData }
          type={ mainFunction === mealById ? 'comida' : 'bebida' }
        />
        <p data-testid="recipe-category">{mainData.strCategory}</p>
        <h2>Ingredientes:</h2>
        <ul>
          {ingredients.map((e, i) => mapOl(e, i))}
        </ul>
        <h2>Instruções:</h2>
        <p data-testid="instructions">{mainData.strInstructions}</p>
        <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
      </>
    );
  }
  return <h1>carregando...</h1>;
};

export default ReceitaEmProgresso;
