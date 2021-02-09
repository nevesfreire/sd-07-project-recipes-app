import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, NotFound,
  ShareButton, FavoriteFoodButton,
} from '../components';
import data from './data';
import '../pages/css/details.css';

export default function DetailsFood({ match }) {
  const { params: { name } } = match;
  if (!name) return (<NotFound />);
  const {
    video: { titleVideo, linkVideo },
    drink: { drinkTitle, drinkImg },
    food: { foodTitle, foodImg },
    img: { picture },
    text: { title, text },
  } = data[name];

  return (
    <div className="details">
      <div className="detailsThumb">
        <img
          data-testid="recipe-photo"
          src={ picture }
          alt="foto"
        />
      </div>
      <div className="favoriteShare">
        <ShareButton />
        <FavoriteFoodButton />
      </div>
      <div className="instuctionsDetails">
        <h1 data-testid="recipe-title">{title}</h1>
        <p data-testid="instructions">
          {text}
        </p>
      </div>
      <div className="PratosFavoritos">
        <h5>Pratos Favoritos</h5>
      </div>
      <div className="redomentationsCards">
        <Card
          title={ drinkTitle }
          img={ drinkImg }
        />
        <Card
          title={ foodTitle }
          img={ foodImg }
        />
      </div>
      <div className="videoDetails">
        <iframe
          data-testid="video"
          title={ titleVideo }
          src={ linkVideo.replace('watch?v=', 'embed/') }
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

DetailsFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
