import React from 'react';
import PropTypes from 'prop-types';

class CardComidas extends React.Component {
  render() {
    const { image, title } = this.props;
    return (
      <div>
        <img src={ image } alt="recipe pic" />
        <div>{title}</div>
      </div>
    );
  }
}
export default CardComidas;

CardComidas.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
