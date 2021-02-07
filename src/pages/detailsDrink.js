import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getDrinkId } from '../services/Api';
import FoodRecom from '../components/FoodRecom';

function DetailsDrink() {
  const [dataDrink, setDataDrink] = useState([]);
  const [done] = useState(false);
  const [copied, setCopied] = useState(false);
  const [start] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const history = useHistory();
  const { push } = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/');
  const ZERO = 0;

  useEffect(() => {
    async function calledIdDrink() {
      setDataDrink(await getDrinkId(idPathName[2]));
    }
    calledIdDrink();
  }, []);

  const shareClicker = () => {
    setCopied(true);
    return copy(`http://localhost:3000/bebidas/${idPathName[2]}`);
  };

  const getFavorited = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) {
      return recipes[0].id === idPathName[2]
        ? setFavorited(!favorited)
        : setFavorited(false);
    } setFavorited(false);
  };

  useEffect(() => {
    function favorit() {
      getFavorited();
    }
    favorit();
  }, []);

  const favoriteRecipe = () => {
    const recipeFavorited = [{
      id: dataDrink[0].idDrink,
      type: 'bebida',
      area: '',
      category: dataDrink[0].strCategory,
      alcoholicOrNot: dataDrink[0].strAlcoholic,
      name: dataDrink[0].strDrink,
      image: dataDrink[0].strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeFavorited));
    return getFavorited();
  };

  const startRecipe = () => (
    <button
      style={ { position: 'fixed',
    bottom: 0 } }
      className="startRecipeBtn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ () => push(`/bebidas/${idPathName[2]}/in-progress`) }
    >
      {start ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );

  const cardDrink = () => (
    <div>
      <img
        style={ { width: '30%' } }
        src={ dataDrink[0].strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ dataDrink[0].strDrink }</h1>
      <label htmlFor="shareBtn">
        <input
          type="image"
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
          id="shareBtn"
          onClick={ () => shareClicker() }
        />
      </label>
      <label htmlFor="favoriteBtn">
        <input
          type="image"
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
          data-testid="favorite-btn"
          id="favoriteBtn"
          onClick={ () => favoriteRecipe() }
        />
      </label>
      <h3 data-testid="recipe-category">{ dataDrink[0].strCategory }</h3>
      <h3 data-testid="recipe-category">{ dataDrink[0].strAlcoholic }</h3>
      {copied && <h3>Link copiado!</h3>}
      <h3>
        Ingredientes
      </h3>
      <p data-testid="0-ingredient-name-and-measure">
        {dataDrink[0].strIngredient1}
        :
        {dataDrink[0].strMeasure1}
      </p>
      <p data-testid="1-ingredient-name-and-measure">
        {dataDrink[0].strIngredient2}
        :
        {dataDrink[0].strMeasure2}
      </p>
      <p data-testid="2-ingredient-name-and-measure">
        {dataDrink[0].strIngredient3}
        :
        {dataDrink[0].strMeasure3}
      </p>
      <p data-testid="3-ingredient-name-and-measure">
        {dataDrink[0].strIngredient4}
        :
        {dataDrink[0].strMeasure4}
      </p>
      <h2>Instruções</h2>
      <p data-testid="instructions">{ dataDrink[0].strInstructions }</p>
      <div>
        <h2>Recomendadas</h2>
        {FoodRecom()}
      </div>
      { !done && startRecipe() }
    </div>
  );

  return (
    <div>
      {console.log('drink:', dataDrink)}
      {
        dataDrink.length > ZERO ? cardDrink() : 'Carregando...'
      }
    </div>
  );
}

export default DetailsDrink;
