import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../Context/Context';
import shareIcon from '../images/shareIcon.svg';

function CardMadeRecipes({ type, id}) {
  // const { setTypeAndIdDetails } = useContext(RecipeContext);

  function copyURL() {
    // console.log(history);
    // console.log(location);
    const inputURL = document.createElement('input');
    const url = document.URL;
    document.body.appendChild(inputURL);
    inputURL.value = url;
    inputURL.select();
    document.execCommand('copy');
    document.body.removeChild(inputURL);
  }



  return (
    // <Link to={ `/${type}/${id}` }>
      <div data-testid="${index}-horizontal-image">
        {/* <button onClick={ copyURL } type="button" id="copy">Copy</button>
        <div data-testid="${index}-horizontal-top-text">categoria</div>
        <div data-testid="${index}-horizontal-name">nome</div>
        <div data-testid="${index}-horizontal-done-date">data</div> */}
        <button type="button" onClick={copyURL}>
          <img src={shareIcon} data-testid="${index}-horizontal-share-btn" />
        </button>
        oioioi
        {/* <div data-testid={ `${index}-${tagName}-horizontal-tag` }>tags das receitas</div> */}
      </div>
    // </Link>
  );
}

CardMadeRecipes.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardMadeRecipes;
