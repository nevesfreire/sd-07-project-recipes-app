import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import '../css/card.css';
import {
  recipeShareOnList,
  recipeShareMessage,
  recipeFavoriteOnList,
} from './QuickDetails';

const recipeImg = (recipeIndex, recipeThumb, Test) => (
  <img
    src={ recipeThumb }
    alt="recipe-img"
    data-testid={ `${recipeIndex}-${Test}-image` }
    className="card-image"
  />
);

const recipeType = (recipeIndex, type) => (
  <h3
    className="card-title"
  >
    {type}
  </h3>
);

const recipeTop = (recipeIndex, area, category, alcoholic) => (
  <h3
    data-testid={ `${recipeIndex}-horizontal-top-text` }
    className="card-title"
  >
    { `${area}${alcoholic} - ${category}` }
  </h3>
);

const recipeTitle = (recipeIndex, recipeName, Test) => (
  <h3
    data-testid={ `${recipeIndex}-${Test}-name` }
    className="card-title"
  >
    {recipeName}
  </h3>
);

const recipeDate = (recipeIndex, doneDate, Test) => (
  <h4
    data-testid={ `${recipeIndex}-${Test}-done-date` }
    className="card-title"
  >
    { `${doneDate}`}
  </h4>
);

const recipeTags = (ind, tags, Test) => {
  if (tags) {
    return tags.map((tag, index) => (
      <p
        key={ index }
        data-testid={ `${ind}-${tag}-${Test}-tag` }
      >
        {tag}
      </p>
    ));
  }
};

function Card(props) {
  const [store, setStore] = useState({});
  const [shared, setShared] = useState(false);
  const [favoriteHeart, setFavoriteHeart] = useState();

  const {
    id,
    Type,
    Area,
    Category,
    Alcoholic,
    Name,
    Thumb,
    Index,
    DoneDate,
    Tags,
    Test,
    Reload,
  } = props;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = favorites.find((favorite) => favorite.id === id);
    if (isFavorite) setFavoriteHeart(true);
    setStore({
      favorites,
    });
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (store) {
      if (favoriteHeart) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, store]));
        Reload(true);
      } else if (!favoriteHeart) {
        const remove = favorites.filter((favorite) => favorite.id !== store.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify([...remove]));
        Reload(true);
      }
    }
  }, [favoriteHeart, store]);

  const sharepath = `/${Type === 'comida' ? 'comidas' : 'bebidas'}/${id}`;
  return (
    <Paper className="paper-style" elevation={ 6 }>
      <div className="image-card">
        {recipeType(Index, Type)}
        <Link to={ sharepath } replace>
          {recipeTitle(Index, Name, Test)}
          {recipeImg(Index, Thumb, Test)}
        </Link>
        {recipeTop(Index, Area, Category, Alcoholic)}
        {recipeDate(Index, DoneDate, Test)}
        {recipeTags(Index, Tags, Test)}
        {recipeShareOnList(sharepath, setShared, Index, Test)}
        {recipeShareMessage(shared)}
        {recipeFavoriteOnList(favoriteHeart, setFavoriteHeart, Index, Test)}
      </div>
    </Paper>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
  Area: PropTypes.string.isRequired,
  Category: PropTypes.string.isRequired,
  Alcoholic: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Thumb: PropTypes.string.isRequired,
  Index: PropTypes.number.isRequired,
  DoneDate: PropTypes.string.isRequired,
  Tags: PropTypes.arrayOf(string).isRequired,
  Test: PropTypes.string.isRequired,
  Reload: PropTypes.func.isRequired,
};

export default Card;
