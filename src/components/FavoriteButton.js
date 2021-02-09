import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteButton extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
    };

    this.favoriteButtonHandle = this.favoriteButtonHandle.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
  }

  componentDidMount() {
    this.isFavorite();
  }

  isFavorite() {
    const { storageObj } = this.props;
    const favRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favRecipeStorage.map((item) => {
      if (item.id === storageObj.id) {
        this.setState({
          favorite: true,
        });
      }
      return null;
    });
  }

  favoriteButtonHandle() {
    const { favorite } = this.state;
    const { storageObj } = this.props;
    const favRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favRecipeStorage, storageObj]),
    );
    this.setState({ favorite: !favorite });
  }

  render() {
    const { favorite } = this.state;
    return (
      <div>
        <button
          style={ { background: 'none', border: 'none' } }
          type="button"
          data-testid="favorite-btn"
          onClick={ this.favoriteButtonHandle }
          src={ !favorite ? whiteHeartIcon : blackHeartIcon }
        >
          { !favorite ? <img src={ whiteHeartIcon } alt="Favorite" />
            : <img src={ blackHeartIcon } alt="Favorite" /> }
        </button>
      </div>
    );
  }
}

FavoriteButton.propTypes = {
  storageObj: PropTypes.objectOf(PropTypes.node).isRequired,
};

export default FavoriteButton;
