import React, { Component } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class TitleBar extends Component {
  render() {
    const { strRecipe, strCategory, handleCopy,
      valueCopied, executeCopy, changeFavorite, favorite } = this.props;
    return (
      <div className="title-container">
        <div className="title-subcontainer">
          <h1 data-testid="recipe-title">{ strRecipe }</h1>
          <h3 data-testid="recipe-category">{ strCategory }</h3>
        </div>
        <div className="images-container">
          <p>{ valueCopied }</p>
          <button type="button" onClick={ () => handleCopy(executeCopy) }>
            <img data-testid="share-btn" src={ shareIcon } alt="shareIcon" />
          </button>
          <button type="button" onClick={ changeFavorite }>
            <img
              data-testid="favorite-btn"
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="whiteHeartIcon"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default TitleBar;

TitleBar.propTypes = {
  strRecipe: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  handleCopy: PropTypes.func.isRequired,
  valueCopied: PropTypes.string.isRequired,
  executeCopy: PropTypes.func.isRequired,
  changeFavorite: PropTypes.func.isRequired,
  favorite: PropTypes.string.isRequired,
};
