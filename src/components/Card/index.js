import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

class CardC extends React.Component {
  render() {
    const {
      card: { strDrink, strDrinkThumb },
    } = this.props;

    const {
      card: { strMeal, strMealThumb },
    } = this.props;

    if (strDrink) {
      return (
        <Card>
          <Card.Img variant="top" src={ strDrinkThumb } />
          <Card.Body>
            <Card.Title>{strDrink}</Card.Title>
          </Card.Body>
        </Card>
      );
    }
    return (
      <Card>
        <Card.Img variant="top" src={ strMealThumb } />
        <Card.Body>
          <Card.Title>{strMeal}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

CardC.propTypes = {
  card: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CardC;
