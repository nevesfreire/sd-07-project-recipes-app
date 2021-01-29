import React, { Component } from 'react';
import { CustomCardFavoriteRecipe } from '../components';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.setStateWithFavoritesLocalStorage = this.setStateWithFavoritesLocalStorage.bind(this);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    // const favoritesLocalStorage = localStorage.getItem('favoriteRecipes');
    // if (favoritesLocalStorage) { JSON.parse(favoritesLocalStorage)
    const objTeste = [{
      id: 5,
      type: 'food',
      area: 'Brasil',
      category: 'pizza',
      alcoholicOrNot: 'no',
      name: 'pizzaTop',
    }];
    this.setStateWithFavoritesLocalStorage(objTeste);
    // }
  }

  setStateWithFavoritesLocalStorage(objTeste) {
    this.setState({
      favorites: objTeste,
    });
  }

  render() {
    // const { favorites } = this.state;
    // console.log(favorites)
    const objTeste = [{
      id: 5,
      type: 'food',
      area: 'Brasil',
      category: 'pizza',
      alcoholicOrNot: 'no',
      name: 'pizzaTop',
      image: 'https://res.cloudinary.com/de4rvmslk/image/upload/f_auto,q_auto,w_1440/LocalStorage-cover_photo.png'
    }];
    return (
      <div>
        {objTeste
          .map((favorite, index) => (
            <div key={ favorite.id }>
              <CustomCardFavoriteRecipe
                key={ favorite.id }
                favorite={ favorite }
              />
              <img src={ shareIcon } alt="link para compartilhar" />
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="icone de favoritado"
              />
            </div>
          ))}
      </div>
    );
  }
}

export default FavoriteRecipes;
