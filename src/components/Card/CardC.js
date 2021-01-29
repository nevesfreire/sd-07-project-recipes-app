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

    const { indexMeal } = this.props;
    const { indexDrink } = this.props;
    console.log(indexMeal);
    if (strDrink) {
      return (
        <Card>
          <Card.Img
            data-testid={ `${indexDrink}-card-img` }
            variant="top"
            src={ strDrinkThumb }
          />
          <Card.Body>
            <Card.Title data-testid={ `${indexDrink}-card-name` }>
              {strDrink}
            </Card.Title>
          </Card.Body>
        </Card>
      );
    }
    return (
      <Card>
        <Card.Img
          data-testid={ `${indexMeal}-card-img` }
          variant="top"
          src={ strMealThumb }
        />
        <Card.Body>
          <Card.Title data-testid={ `${indexMeal}-card-name` }>{strMeal}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

CardC.propTypes = {
  card: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CardC;
