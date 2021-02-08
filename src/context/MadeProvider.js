import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MadeContext from './MadeContext';
import shareIcon from '../images/shareIcon.svg';

const MadeProvider = ({ children }) => {
  const [made, setMade] = useState([]);
  const [filterButton, setFilterButton] = useState('all');
  const [pathImage, setPathImage] = useState();

  const getStorage = useCallback((key) => JSON.parse(localStorage.getItem(key)), []);

  const handleShare = (name, id) => {
    console.log(name, id);
    const completePath = `http://localhost:3000/${name}s/${id}`;
    navigator.clipboard.writeText(completePath);
    setPathImage(completePath);
  };

  const allMadeRecipes = () => {
    const comida = made.filter((recipe) => recipe.type === 'comida');
    const bebida = made.filter((recipe) => recipe.type === 'bebida');
    let list = {};
    if (filterButton === 'comida') {
      list = comida;
    } else if (filterButton === 'bebida') {
      list = bebida;
    } else {
      list = made;
    }
    console.log(list);

    return list.map((recipe, index) => (
      <div key={ index }>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            className="image-recipe"
          />
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.type === 'comida' ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
        </p>
        <a href={ `/${recipe.type}s/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        </a>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        <div>
          <button
            type="button"
            className="share-btn"
            onClick={ (e) => handleShare(e.target.name, e.target.id) }
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
              id={ recipe.id }
              name={ recipe.type }
            />
          </button>
          { pathImage && <p className="share-text">Link copiado!</p> }
        </div>
        {recipe.tags.map((tag, index2) => (
          <span key={ index2 } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {tag}
          </span>
        ))}
      </div>
    ));
  };

  return (
    <MadeContext.Provider
      value={ {
        made,
        setMade,
        filterButton,
        setFilterButton,
        allMadeRecipes,
        getStorage,
      } }
    >
      {children}
    </MadeContext.Provider>
  );
};

export default MadeProvider;

MadeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;
