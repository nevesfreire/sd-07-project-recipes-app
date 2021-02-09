import React, { useContext, useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import { fetchAllFoodRecipes } from '../services/foodApiFunctions';
import { fetchDrinkDetailById } from '../services/drinkApiFunctions';
import shareIcon from '../images/shareIcon.svg';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import './recipes.css';

function DrinksDetails(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recomended, setRecomendedRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [clipboard, setClipboard] = useState('');

  const {
    drinkDetail,
    setDrinkDetail,
    setId,
    id,
  } = useContext(RecipesContext);

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
      type: 'bebida',
      area: '',
      category: drinkDetail.strCategory,
      alcoholicOrNot: drinkDetail.strAlcoholic,
      name: drinkDetail.strDrink,
      image: drinkDetail.strDrinkThumb,
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRec]));
    localStorage.setItem('favorites', JSON.stringify([id]));
    setIsFavorite(true);
  };

  const copyClipboard = async () => {
    const urlarray = window.location.href.split('/');
    const url = `${urlarray[0]}//${urlarray[2]}/bebidas/${id}`;
    await clipboardCopy(url);
    setClipboard({ mensagem: 'Link copiado!' });
  };

  const recomendedFood = async () => {
    const allFoods = await fetchAllFoodRecipes();
    const sixFoods = allFoods.meals.slice(zero, six);
    console.log(sixFoods);
    setRecomendedRecipes(sixFoods);
  };

  useEffect(() => {
    recomendedFood();
    const { match } = props;
    const idRandom = match.params.id;
    setId(idRandom);
    fetchDrinkDetailById(idRandom)
      .then((response) => setDrinkDetail(response.drinks[0]));
  }, [setDrinkDetail, setId, props]);

  useEffect(() => {
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
  }, [drinkDetail]);

  return (
    <div className="main_recipe">
      {console.log(drinkDetail.idDrink)}
      <img
        data-testid="recipe-photo"
        alt="Imagem da comida"
        src={ drinkDetail.strDrinkThumb }
      />
      <div className="initial-informations">
        <h2
          data-testid="recipe-title"
        >
          {drinkDetail.strDrink}
        </h2>
        <p
          data-testid="recipe-category"
        >
          {drinkDetail.strAlcoholic}
        </p>
        <div className="interation-buttons">
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt="compartilhar"
            onClick={ copyClipboard }
          />
          { clipboard.mensagem }
          <input
            type="image"
            onClick={ handlerFavorite }
            data-testid="favorite-btn"
            src={ isFavorite ? blackHearthIcon : whiteHearthIcon }
            alt="Icone Favoritar"
          />
        </div>
      </div>
      <div className="ingredients">
        <h3>Ingredientes</h3>
        {
          ingredients.map(
            (item, index) => (
              <span
                key={ index }
              >
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${item.nomeIngrediente}` }
                </p>
                <p className="measure">
                  {`(${item.medida})`}
                </p>
              </span>
            ),
          )
        }
      </div>
      <div className="prepare">
        <h3>Modo de preparo</h3>
        <p
          data-testid="instructions"
        >
          {drinkDetail.strInstructions}
        </p>
      </div>
      Receitas recomendadas
      <div className="slider">
        <Slider { ...settings }>
          {
            recomended.map(
              (item, index) => {
                if (index > six) return null;
                return (
                  <div
                    key={ index }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img alt="imagem" src={ item.strMealThumb } />
                    <p
                      data-testid={ `${index}-recomendation-title` }
                    >
                      {item.strMeal}
                    </p>
                  </div>
                );
              },
            )
          }
        </Slider>
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
