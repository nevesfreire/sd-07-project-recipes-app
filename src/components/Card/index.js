import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Context from '../../context';
import RequestData from '../../services/RequestAPI';
import './style.css';

function Card({
  name, thumb, id, recipeType,
  testIdCard, testIdThumb, testIdTitle,
}) {
  const { location } = useHistory();
  const { pathname } = location;

  const { setData } = useContext(Context);
  const { setExplorer } = useContext(Context);

  // console.log(thumb);

  let mealOrCoktail = 'cocktail';
  let mealOrDrink = 'drink';

  if (pathname.includes('comidas')) {
    mealOrCoktail = 'meal';
    mealOrDrink = 'meal';
  }

  const Request = async (url) => {
    const RequestedAPI = await RequestData(url);
    if (RequestedAPI[`${mealOrDrink}s`] === null) {
      RequestedAPI[`${mealOrDrink}s`] = undefined;
    }
    setData(RequestedAPI[`${mealOrDrink}s`]);
    return (RequestedAPI[`${mealOrDrink}s`]);
  };

  async function handleClick() {
    const URL = `https://www.the${mealOrCoktail}db.com/api/json/v1/1/filter.php?i=${name}`;
    if (pathname.includes('explorar')) await setExplorer(false);
    await Request(URL);
  }

  return (
    <Link
      className="card-container"
      data-testid={ testIdCard }
      to={
        pathname.includes('explorar')
          ? { pathname: `/${recipeType}` }
          : { pathname: `/${recipeType}/${id}` }
      }
      onClick={ () => handleClick() }
    >
      <img
        className="image-content"
        src={ thumb }
        alt="Thumb"
        data-testid={ testIdThumb }
      />
      <span data-testid={ testIdTitle }>{name}</span>
    </Link>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  testIdCard: PropTypes.string.isRequired,
  testIdThumb: PropTypes.string.isRequired,
  testIdTitle: PropTypes.string.isRequired,
};

export default Card;
