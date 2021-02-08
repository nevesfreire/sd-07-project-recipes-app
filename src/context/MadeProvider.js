import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MadeContext from './MadeContext';
import shareIcon from '../images/shareIcon.svg';

const MadeProvider = ({ children }) => {
  const [made, setMade] = useState([
    {
      id: '52771',
      type: 'comidas',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '3/2/2021',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '52741',
      type: 'bebidas',
      area: '',
      category: '',
      alcoholicOrNot: 'Alcoholic',
      name: 'Caipirinha',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '5/2/2021',
      tags: [],
    },
  ]);
  const [filterButton, setFilterButton] = useState('all');
  const [pathImage, setPathImage] = useState();

  const handleShare = (name, id) => {
    console.log(name, id);
    const completePath = `http://localhost:3000/${name}/${id}`;
    navigator.clipboard.writeText(completePath);
    setPathImage(completePath);
  };

  const allMadeRecipes = () => {
    const comida = made.filter((recipe) => recipe.type === 'comidas');
    const bebida = made.filter((recipe) => recipe.type === 'bebidas');
    let list = {};
    if (filterButton === 'comidas') {
      list = comida;
    } else if (filterButton === 'bebidas') {
      list = bebida;
    } else {
      list = made;
    }
    console.log(list);

    return list.map((recipe, index) => (
      <div key={ index }>
        <a href={ `/${recipe.type}/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </a>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.type === 'comida' ? recipe.category : recipe.alcoholicOrNot}
        </p>
        <a href={ `/${recipe.type}/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        </a>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        <div>
          <button
            type="button"
            className="share-btn"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ (e) => handleShare(e.target.name, e.target.id) }
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid="share-btn"
              id={ recipe.id }
              name={ recipe.type }
            />
          </button>
          { pathImage && <p className="share-text">Link copiado!</p> }
        </div>
        {recipe.tags.map((tag, index2) => (
          <span key={ index2 } data-testid={ `${index}-tagName-horizontal-tag` }>
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
