import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import '../css/card.css';
import {
  recipeShareOnList,
  recipeShareMessage,
  recipeFavoriteOnList,
} from './QuickDetails';

// cy.get('[data-testid="0-horizontal-image"]');
// cy.get('[data-testid="0-horizontal-top-text"]');
// cy.get('[data-testid="0-horizontal-name"]');
// cy.get('[data-testid="0-horizontal-done-date"]');
// cy.get('[data-testid="0-horizontal-share-btn"]');
// cy.get('[data-testid="0-Pasta-horizontal-tag"]');
// cy.get('[data-testid="0-Curry-horizontal-tag"]');

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
    // data-testid={ `${recipeIndex}-${Test}-top-text` }
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
  // key={ recipe.id }
  // id={ recipe.id }
  // Type={ recipe.type }
  // Area={ recipe.area }
  // Category={ recipe.category }
  // Alcoholic={ recipe.alcoholicOrNot }
  // Name={ recipe.name }
  // Thumb={ recipe.image }
  // Index={ index }
  // doneDate={ recipe.doneDate }
  // tags={ recipe.tags }
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
  } = props;

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
};

export default Card;
