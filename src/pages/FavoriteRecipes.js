import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { TWO_THOUSAND, ZERO } from '../services/helpers';
import perfilIcon from '../images/profileIcon.svg';
import '../style/favorites.css';

function FavoriteRecipes() {
  const [favorited, setFavorited] = useState([]);
  const [type, setType] = useState('');
  const [copyText, setCopyText] = useState('');

  useEffect(() => {
    setFavorited(JSON.parse(localStorage.favoriteRecipes));
  }, []);

  const handleFilterClick = ({ target }) => {
    setType(target.name);
  };

  const handleCopyClick = (food) => {
    copy(`http://localhost:3000/${food.type}s/${food.id}`);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), TWO_THOUSAND);
  };

  const handleFavoriteClick = ({ target }) => {
    const recipes = JSON.parse(localStorage.favoriteRecipes);
    const AllFavorites = recipes.filter((recipe) => recipe.id !== target.name);
    localStorage.favoriteRecipes = JSON.stringify(AllFavorites);
    setFavorited(recipes.filter((recipe) => recipe.id !== target.name));
  };

  if (favorited.length === ZERO) {
    return (
      <div>
        <h2>Você não tem receitas favoritas</h2>
        <Link to="/comidas">
          <button type="button">Voltar</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1 data-testid="page-title">
          Receitas Favoritas
        </h1>
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ perfilIcon }
              alt="perfil"
            />
          </button>
        </Link>
      </header>
      <div>
        <h2>Filtrar por:</h2>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name=""
          onClick={ handleFilterClick }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="comida"
          onClick={ handleFilterClick }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="bebida"
          onClick={ handleFilterClick }
        >
          Drinks
        </button>
      </div>
      <p className="message">{copyText}</p>
      {
        favorited
          .filter((element) => element.type.includes(type)).map((food, index) => (
            <div key={ index }>
              <Link to={ `/${food.type}s/${food.id}` }>
                <img
                  width="200"
                  data-testid={ `${index}-horizontal-image` }
                  src={ food.image }
                  alt={ food.name }
                />
                <h3 data-testid={ `${index}-horizontal-top-text` }>
                  {(food.type === 'comida')
                    ? `${food.area} - ${food.category}`
                    : food.alcoholicOrNot}
                </h3>
                <h2 data-testid={ `${index}-horizontal-name` }>{food.name}</h2>
              </Link>
              <div>
                <button
                  onClick={ () => handleCopyClick(food) }
                  type="button"
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ food.name }
                  />
                </button>
              </div>
              <div>
                <button
                  onClick={ handleFavoriteClick }
                  type="button"
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    name={ food.id }
                    src={ blackHeartIcon }
                    alt="favorite logo"
                  />
                </button>
              </div>
            </div>
          ))
      }
    </div>
  );
}

export default FavoriteRecipes;
