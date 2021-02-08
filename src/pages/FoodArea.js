import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArea, fetchFilteredArea } from '../actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import '../css/recipe.css';

class FoodArea extends Component {
  constructor(props) {
    super(props);

    this.filterAreas = this.filterAreas.bind(this);
    this.redirectRecipe = this.redirectRecipe.bind(this);

    this.state = {
      areaFilter: 'All',
    };
  }

  componentDidMount() {
    const { requestArea, requestFoodArea } = this.props;
    const { areaFilter } = this.state;
    requestArea('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    if (areaFilter === 'All') {
      requestFoodArea('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      requestFoodArea(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaFilter}`);
    }
  }

  filterAreas({ target }) {
    const { name, value } = target;
    const { requestFoodArea } = this.props;
    this.setState({
      [name]: value,
    },
    () => {
      const { areaFilter } = this.state;
      if (areaFilter === 'All') {
        requestFoodArea('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      } else {
        requestFoodArea(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaFilter}`);
      }
    });
  }

  redirectRecipe(id) {
    const { history } = this.props;
    history.push(`/comidas/${id}`);
  }

  render() {
    const { history, areas, areasFiltered } = this.props;
    const { areaFilter } = this.state;
    const MIN_LENGTH_CARD = 12;
    if (!areas.meals) return <Loading />;
    return (
      <div>
        <Header title="Explorar Origem" history={ history } />
        <section>
          <select
            name="areaFilter"
            value={ areaFilter }
            onChange={ this.filterAreas }
            data-testid="explore-by-area-dropdown"
          >
            <option
              key="All"
              data-testid="All-option"
            >
              All
            </option>
            {
              areas.meals.map((area) => (
                <option
                  key={ area.strArea }
                  data-testid={ `${area.strArea}-option` }
                >
                  {area.strArea}
                </option>))
            }
          </select>
        </section>
        <section>
          {
            areasFiltered.meals
              ? areasFiltered.meals
                .filter((_card, index) => index < MIN_LENGTH_CARD)
                .map((area, index) => {
                  const { strMeal, strMealThumb, idMeal } = area;
                  return (
                    <div
                      key={ idMeal }
                      data-testid={ `${index}-recipe-card` }
                    >
                      <button
                        type="button"
                        onClick={ () => this.redirectRecipe(idMeal) }
                      >
                        <img
                          src={ strMealThumb }
                          alt={ strMeal }
                          data-testid={ `${index}-card-img` }
                          width="200"
                        />
                        <h1 data-testid={ `${index}-card-name` }>
                          {strMeal}
                        </h1>
                      </button>
                    </div>
                  );
                })
              : <Loading />
          }
        </section>
        <Footer history={ history } />
      </div>
    );
  }
}

const mapStateToProps = ({ exploreAreaReducer }) => ({
  areas: exploreAreaReducer.areas,
  areasFiltered: exploreAreaReducer.areasFiltered,
});

const mapDispatchToProps = (dispatch) => ({
  requestArea: (endpoint) => dispatch(fetchArea(endpoint)),
  requestFoodArea: (endpoint) => dispatch(fetchFilteredArea(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodArea);

FoodArea.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  areas: PropTypes.shape({
    meals: Proptypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  areasFiltered: PropTypes.shape({
    meals: Proptypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  requestArea: PropTypes.func.isRequired,
  requestFoodArea: PropTypes.func.isRequired,
};
