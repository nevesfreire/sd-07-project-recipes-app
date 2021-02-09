import React, { useContext, useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import { fetchFoodDetailById } from '../services/foodApiFunctions';
import { fetchAllDrinkRecipes } from '../services/drinkApiFunctions';
import shareIcon from '../images/shareIcon.svg';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import './recipes.css';

function RecipesDetails(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recomended, setRecomendedDrinks] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [clipboard, setClipboard] = useState('');
  const { foodDetail, setFoodDetail, setId, id } = useContext(RecipesContext);
  const zero = 0;
  const six = 6;
  const fifty = 50;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const handlerFavorite = () => {
    const favoriteRec = {
      id,
      type: 'comida',
      area: 'Italian',
      category: foodDetail.strCategory,
      alcoholicOrNot: '',
      name: foodDetail.strMeal,
      image: foodDetail.strMealThumb,
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRec]));
    localStorage.setItem('favorites', JSON.stringify(id));
    setIsFavorite(true);
  };

  const copyClipboard = async () => {
    const urlarray = window.location.href.split('/');
    const url = `${urlarray[0]}//${urlarray[2]}/comidas/${id}`;
    await clipboardCopy(url);
    setClipboard({ mensagem: 'Link copiado!' });
  };
  const recomendedDrink = async () => {
    const allDrinks = await fetchAllDrinkRecipes();
    const sixDrinks = allDrinks.drinks.slice(zero, six);
    console.log(sixDrinks);
    setRecomendedDrinks(sixDrinks);
  };
  useEffect(() => {
    recomendedDrink();
    const { match } = props;
    const idRandom = match.params.id;
    setId(idRandom);
    fetchFoodDetailById(idRandom).then((response) => setFoodDetail(response.meals[0]));
  }, [props, setFoodDetail, setId]);

  useEffect(() => {
    const allIngredients = [];
    for (let i = zero; i <= fifty; i += 1) {
      if (foodDetail[`strIngredient${i}`]) {
        allIngredients.push({
          nomeIngrediente: foodDetail[`strIngredient${i}`],
          medida: foodDetail[`strMeasure${i}`],
        });
      }
    }
    setIngredients(allIngredients);
  }, [foodDetail]);

  return (
    <div className="main_recipe">
      <img
        data-testid="recipe-photo"
        alt="Imagem da comida"
        src={ foodDetail.strMealThumb }
      />
      <div className="initial-informations">
        <h2 data-testid="recipe-title">{foodDetail.strMeal}</h2>
        <p data-testid="recipe-category">{foodDetail.strCategory}</p>
        <div className="interation-buttons">
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt="compartilhar"
            onClick={ copyClipboard }
          />
          {clipboard.mensagem}
          <button type="button" onClick={ handlerFavorite }>
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHearthIcon : whiteHearthIcon }
              alt="Icone Favoritar"
            />
          </button>
        </div>
      </div>
      <div>
        <div className="ingredients">
          <h3>Ingredientes</h3>
          {ingredients.map((item, index) => (
            <span
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <p>{`${item.nomeIngrediente}`}</p>
              <p className="measure">{`(${item.medida})`}</p>
            </span>
          ))}
        </div>
        <div className="prepare">
          <h3>Modo de preparo</h3>
          <p data-testid="instructions">{foodDetail.strInstructions}</p>
        </div>
      </div>
      <div data-testid="video" src={ foodDetail.strYoutube } />
      <div className="slider">
        <Slider { ...settings }>
          {recomended.map((item, index) => {
            if (index > six) return null;
            return (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                <img alt="imagem" src={ item.strDrinkThumb } />
                <p data-testid={ `${index}-recomendation-title` }>
                  {item.strDrink}
                </p>
              </div>
            );
          })}
        </Slider>
      </div>
      <Link to={ `/comidas/${id}/in-progress` }>
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
RecipesDetails.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default RecipesDetails;
