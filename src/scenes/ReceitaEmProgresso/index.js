import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import shareImg from '../../images/shareIcon.svg';
import FavBtn from '../../common/FavBtn';
import { mealById, drinkById } from '../../services/API';
import './style.css';

const ReceitaEmProgresso = () => {
  const history = useHistory();
  const [mainData, setMainData] = useState({});
  const [copyOK, setCopyOK] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const { pathname } = history.location;
  const { id } = useParams();
  const mainFunction = pathname.includes('comida') ? mealById : drinkById;
  const ingredients = Object.keys(mainData)
    .filter((e) => e.includes('strIngredient')
    && mainData[e] !== null && mainData[e] !== '');
  const mapOl = (e, i) => (
    <li key={ i }>
      <input
        type="checkbox"
        name={ mainData[e] }
        id={ mainData[e] }
        data-testid="ingredient-step"
      />
      <label
        htmlFor={ mainData[e] }
      >
        { mainData[e] }

      </label>

    </li>);
  useEffect(() => {
    const getData = async () => {
      const data = await mainFunction(id);
      setMainData(data);
      setIsLoading(false);
    };
    getData();
  }, [id, mainFunction]);
  if (!isloading) {
    console.log(mainData);
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={
            mainFunction === mealById ? mainData.strMealThumb : mainData.strDrinkThumb
          }
          alt=""
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
        <h1>{copyOK && 'Link copiado!'}</h1>
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
        <button type="button" data-testid="finish-recipe-btn">Finaliza</button>
      </>
    );
  }
  return <h1>carregando...</h1>;
};

export default ReceitaEmProgresso;
