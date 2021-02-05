import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import {
  getSpecificMealById,
  getRecommendatedMeals,
} from '../../store/ducks/getDetailedMeal/actions';

class TelaDeReceitaEmProcesso extends Component {
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { getDetailedMealDispatch } = this.props;
    await getDetailedMealDispatch(id);
  }

  handleIngredients(meal) {
    const mealArray = Object.entries(meal[0]);
    const ingredientsArray = mealArray.filter(
      (element) => element[0].startsWith('strIngredient') && element[1],
    );
    return ingredientsArray;
  }

  handleTime() {
    const HoraInicial = new Date();
    const horaFinal = HoraInicial.toLocaleDateString();
  }
  handleMeasure(meal) {
    const mealArray = Object.entries(meal[0]);
    const measuresArray = mealArray.filter(
      (element) => element[0].startsWith('strMeasure') && element[1],
    );
    return measuresArray;
  }

  renderDetails(meal) {
    const ingredientsArray = this.handleIngredients(meal);
    const measuresArray = this.handleMeasure(meal);

    return (
      <>
        <Container>
          <img data-testid="recipe-photo" alt="comida" src={ meal[0].strMealThumb } />
          <h3 data-testid="recipe-title">{meal[0].strMeal}</h3>
          <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
          <img data-testid="favorite-btn" alt="favorite-btn" src={ whiteHeartIcon } />
          <h4 data-testid="recipe-category">{meal[0].strCategory}</h4>
        </Container>
        <Container>
          <Form>
            {ingredientsArray.map((item, index) => (
              <div className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={ `${item[1]} - ${measuresArray[index][1]}` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ item }
                >
                </Form.Check>
              </div>
            ))}

            <p data-testid="instructions">{meal[0].strInstructions}</p>

            <Button
              variant="secondary"
              block
              size="lg"
              data-testid="profile-done-btn"
              onClick="vai pra algum lugar"
            >
              Finalizar Receita
            </Button>
          </Form>
        </Container>
      </>
    );
  }

  render() {
    const { meal } = this.props;
    if (meal) {
      return this.renderDetails(meal);
    }
    return <div>nundeu</div>;
  }
}

TelaDeReceitaEmProcesso.propTypes = {
  meal: PropTypes.arrayOf(PropTypes.Object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getDetailedMealDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.detalhesDaReceitaComida.meal.meals,
  mealsRecommendStore: state.detalhesDaReceitaComida.mealRecommend.meals,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
  getRecommendationMeals: () => dispatch(getRecommendatedMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDeReceitaEmProcesso);
