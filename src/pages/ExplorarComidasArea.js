import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import apiTheMealDB from '../services/apiTheMealDB';
import RecipesCards from '../components/RecipesCard';

class ExplorarComidasArea extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      recipes: null,
      all: [],
    };
    this.getCategory = this.getCategory.bind(this);
    this.filterByArea = this.filterByArea.bind(this);
    this.getAllAreas = this.getAllAreas.bind(this);
    this.initialCards = this.initialCards.bind(this);
  }

  async componentDidMount() {
    await this.getCategory();
    await this.getAllAreas();
    await this.initialCards();
  }

  async getAllAreas() {
    const { list } = this.state;
    const allAreas = [];
    list.forEach(async (area) => {
      const result = await apiTheMealDB(`filter.php?a=${area}`);
      if (result.meals !== null) allAreas.push(result.meals[0]);
    });
    this.setState({ all: allAreas });
  }

  async getCategory() {
    const { list } = this.state;
    if (list.length < 1) {
      const result = await apiTheMealDB('list.php?a=list');
      const category = ['All'];
      result.meals.forEach((item) => category.push(item.strArea));
      this.setState({ list: category });
    }
  }

  async filterByArea({ target: { value } }) {
    const { all } = this.state;
    if (value !== 'All') {
      const result = await apiTheMealDB(`filter.php?a=${value}`);
      this.setState({ recipes: result.meals });
    }
    if (value === 'All') this.setState({ recipes: all });
  }

  async initialCards() {
    const { recipes } = this.state;
    if (!recipes) {
      const result = await apiTheMealDB(`filter.php?a=${'american'}`);
      this.setState({ recipes: result.meals });
    }
  }

  render() {
    const { list, recipes } = this.state;
    return (
      <div>
        <Container>
          <Header shouldRenderSearchIcon="yes" search="meals" pageTitle="Explorar Origem" />
          {list ? (
            <div>
              <select data-testid="explore-by-area-dropdown" onChange={ this.filterByArea }>
                {list.map((category) => (
                  <option
                    data-testid={ `${category}-option` }
                    key={ category }
                    value={ category }
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>) : <p>Loading...</p>}
          { recipes && (
            <Container>
              <Row>
                {recipes.map((item, index) => (
                  <Link to={ `/comidas/${item.idMeal}` } key={ index }>
                    <RecipesCards
                      recipe={ item }
                      search="meals"
                      index={ index }
                    />
                  </Link>))}
              </Row>
            </Container>
          )}
          <Footer />
        </Container>
      </div>
    );
  }
}

export default ExplorarComidasArea;
