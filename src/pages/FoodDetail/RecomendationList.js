import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import RecomedendationCard from './RecomedendationCard';

export default function RecomendationList({ data }) {
  const maxList = 6;
  const inicialization = 0;
  const recomendationData = [];
  for (let index = inicialization; index < maxList; index += 1) {
    recomendationData.push(data[index]);
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Slider { ...settings }>
      { recomendationData.map((item, index) => (
        <RecomedendationCard key={ index } data={ item } index={ index } />
      ))}
    </Slider>
  );
}

RecomendationList.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
