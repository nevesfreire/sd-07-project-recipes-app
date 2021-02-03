import React, { useContext, useEffect, useState } from 'react';
import { getItem, saveItem, initialize } from '../../services/localStorage';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg'

function FavoriteRecipes() {
  const copy = require('clipboard-copy');
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [showCopiedMessage, setCopiedMessage] = useState('hidden');

  useEffect(() => {
    const favoritesRecipes = getItem('favoriteRecipes');
    if (!favoritesRecipes) initialize();
    else setFavoritesRecipes(favoritesRecipes)
  }, [])

  const copyLink = (type, id) => {
    const twoSecondes = 2000;
    let kindOfFood = ""
    if(type === 'comida') kindOfFood = 'comidas'
    else kindOfFood = 'bebidas'
    const getUrl = `http://localhost:3000/${kindOfFood}/${id}`;
    copy(getUrl);
    setCopiedMessage('');
    setTimeout(() => { setCopiedMessage('hidden'); }, twoSecondes);
  };
  return (
    <div>
      <ul>
        <li>
          <button
            data-testid="filter-by-all-btn"
          >
            Filter All
          </button>
        </li>
        <li>
          <button
            data-testid="filter-by-food-btn"
          >
            Filter by Food
          </button>
        </li>
        <li>
          <button
            data-testid="filter-by-drink-btn"
          >
            Filter by Drink
          </button>
        </li>
      </ul>
      <section>
        {favoritesRecipes.map(
          ({ alcoholicOrNot,
            area,
            category,
            id,
            image,
            name,
            type,
          }, index) => {
            return (
              <div key={id}>
                <p data-testid={`${index}-horizontal-name`}>
                  {name}
                </p>
                <img
                  data-testid={`${index}-horizontal-image`}
                  src={image}
                  width="75px"
                  alt="Foto de Alimento"
                />
                <p data-testid={`${index}-horizontal-top-text`} >
                  {type === 'bebida' ? alcoholicOrNot : `${area} - ${category}`}
                </p>
                <button
                  data-testid={`${index}-horizontal-share-btn`}
                  src={shareIcon}
                  onClick={()=>copyLink(type,id)}
                >
                  <img src={shareIcon} />
                  Compartilhar
                </button>
                <p hidden={ showCopiedMessage }>Link copiado!</p>
                <button
                  data-testid={`${index}-horizontal-favorite-btn`}
                  src={blackHeartIcon}
                >
                  <img src={blackHeartIcon} />
                  Favoritar
                </button>
              </div>
            )
          })}
      </section>
    </div>
  )
}

export default FavoriteRecipes;