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
  }

  favoriteButtonHandle() {
    const { favorite } = this.state;
    const { storageObj } = this.props;
    this.setState({ favorite: !favorite });
    const favRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favRecipeStorage, storageObj]),
    );
  }

  render() {
    const { favorite } = this.state;
    return (
      <div>
        <button
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
