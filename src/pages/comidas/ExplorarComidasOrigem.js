import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const ZERO = 0;
const TWELVE = 12;

export default class ExplorarComidasOrigem extends React.Component {
  constructor() {
    super();
    this.state = {
      areas: [],
      recipes: [],
      optionArea: '',
    };
    this.fetchAreas = this.fetchAreas.bind(this);
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.fetchChangeArea = this.fetchChangeArea.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendToDetails = this.sendToDetails.bind(this);
  }

  componentDidMount() {
    this.fetchAreas();
    this.fetchRecipes();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (value === 'all') {
      this.fetchRecipes();
    } else {
      this.fetchChangeArea(value);
    }
  }

  async fetchRecipes() {
    const responseAPI = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await responseAPI.json();
    const copyData = [...data.meals];
    const recipes = copyData.splice(ZERO, TWELVE);
    this.setState({
      recipes,
    });
  }

  async fetchAreas() {
    const responseAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await responseAPI.json();
    const areas = data.meals;
    this.setState({
      areas,
    });
  }

  async fetchChangeArea(area) {
    const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await responseAPI.json();
    const recipes = data.meals.splice(ZERO, TWELVE);
    this.setState({
      recipes,
    });
  }

  sendToDetails(id) {
    const { history } = this.props;
    history.push(`/comidas/${id}`);
  }

  renderCards() {
    const { recipes } = this.state;
    return (
      recipes.map((r, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-recipe-card` }
          onClick={ () => this.sendToDetails(r.idMeal) }
        >
          <img
            src={ r.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="recipe img"
            width="100px"
          />
          <h4 data-testid={ `${index}-card-name` }>{r.strMeal}</h4>
        </button>
      ))
    );
  }

  render() {
    const { areas, optionArea } = this.state;
    return (
      <div>
        <Header title="Explorar Origem" />
        <select
          data-testid="explore-by-area-dropdown"
          value={ optionArea }
          name="optionArea"
          onChange={ this.handleChange }
        >
          <option key="All" data-testid="All-option" value="all">All</option>
          {areas
            .map((area) => (
              <option
                data-testid={ `${area.strArea}-option` }
                key={ area.strArea }
                value={ area.strArea }
                name={ area.strArea }
              >
                {area.strArea}
              </option>))}
        </select>
        <div>
          {this.renderCards()}
        </div>
        <Footer />
      </div>
    );
  }
}

ExplorarComidasOrigem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
