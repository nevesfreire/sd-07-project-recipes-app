import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { mealById, mealRecomendations } from '../../services/API';
import './style.css';
import shareImg from '../../images/shareIcon.svg';
import favImgON from '../../images/whiteHeartIcon.svg';
import favImgOFF from '../../images/blackHeartIcon.svg';
import { toggleFav, checkFav } from '../../services/saveLocal';
import FavBtn from '../../common/FavBtn';

const ComidaDetails = () => {
  const history = useHistory();
  const [mainData, setMainDate] = useState({});
  const [recomen, setRecomen] = useState([]);
  const [copyOK, setCopyOK] = useState(false);
  const { id } = useParams();
  const [favRecipe, setFavRecipe] = useState(true);

  useEffect(() => {
    setFavRecipe(checkFav(id));
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      const data = await mealById(id);
      setMainDate(data.meals[0]);

      const recomendations = await mealRecomendations();
      setRecomen(recomendations.drinks);
    };
    getData();
  }, [id]);

  if (mainData) {
    const { strMealThumb, strMeal, strCategory, strInstructions } = mainData;
    const ingredients = Object.keys(mainData).filter((e) => e.includes('strIngredient'));
    const measures = Object.keys(mainData).filter((e) => e.includes('strMeasure'));
    const recomendations = recomen.map((e) => e.strDrink).slice(0, 6);
    return (
      <div>
        <img
          src={ strMealThumb }
          alt="meal"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{strMeal}</h1>
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
        <FavBtn mainData={ mainData } type="comida" />
        <p data-testid="recipe-category">{strCategory}</p>
        <p data-testid="instructions">{strInstructions}</p>
        <h2>Ingredientes:</h2>
        <ol>
          {ingredients.map((e, i) => <li data-testid={ `${i}-ingredient-name-and-measure`} key={i}>{mainData[e]}</li>)}
        </ol>
        <ol>
          {measures.map((e, i) => <li data-testid={ `${i}-ingredient-name-and-measure`} key={i}>{mainData[e]}</li>)}
        </ol>
        <iframe
          title="video"
          data-testid="video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/vaZb1MnFBgA"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button
          onClick={() => history.push(`/comidas/${id}/in-progress`)}
          className="startRecipe"
          type="button"
          data-testid="start-recipe-btn"
        >
          iniciar receita
        </button>
        <ol className="recomendations">
          {recomendations.map((e, i) => (
            <li data-testid={`${i}-recomendation-card`} key={i}>
              <p data-testid={`${i}-recomendation-title`}>{e}</p>
            </li>))}
        </ol>
      </div>
    );
  }
  return <h1>carregando...</h1>;
};

export default ComidaDetails;
