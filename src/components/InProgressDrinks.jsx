import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';

class InProgressDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredientsList: [],
      ingrentsMeasuresList: [],
    };
    this.maracutaia = this.maracutaia.bind(this);
  }

  componentDidMount() {
    this.maracutaia();
  }

  maracutaia() {
    const { inProgressRecipesDrink } = this.props;
    const ingredientsList = [];
    const ingrentsMeasuresList = [];
    Object.entries(inProgressRecipesDrink).filter((item) => (
      (item[0].includes('strIngredient') && item[1] !== '' && item[1] !== null)
      && ingredientsList.push(item[1])
    ));
    Object.entries(inProgressRecipesDrink).filter((item) => (
      (item[0].includes('strMeasure') && item[1] !== ' ' && item[1] !== null)
       && ingrentsMeasuresList.push(item[1])
    ));
    this.setState({ ingredientsList, ingrentsMeasuresList });
  }

  render() {
    const { inProgressRecipesDrink } = this.props;
    const { ingredientsList, ingrentsMeasuresList } = this.state;
    return (
      <Container fluid>
        <Col>
          <img
            src={ inProgressRecipesDrink.strMealThumb }
            style={ { width: '20%' } }
            data-testid="recipe-photo"
            alt="someAlt"
          />
        </Col>
        <h3
          data-testid="recipe-title"
        >
          {inProgressRecipesDrink.strMeal}
        </h3>
        <p
          data-testid="recipe-category"
        >
          {inProgressRecipesDrink.strArea}
        </p>
        <Col>
          <Row>
            { ingredientsList.map((item, index) => (
              <Col
                data-testid={ `${index}-ingredient-step` }
                key={ index }
              >
                <p>
                  {`${item} 
                  ${ingrentsMeasuresList[index] ? ingrentsMeasuresList[index] : ''}`}
                </p>
              </Col>
            ))}
            <span data-testid="instructions">
              {inProgressRecipesDrink.strInstructions}
            </span>
            <button
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar
            </button>
          </Row>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = ({ recipes: { inProgressRecipesDrink } }) => (
  { inProgressRecipesDrink }
);

InProgressDrinks.propTypes = {
  inProgressRecipesDrink: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(InProgressDrinks);
