import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCategories, setFilterRecipes, loadRecipes } from '../redux/action';
import { fetchFoodCategory } from '../services';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categoriaAtual: 'All',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { loadcategories, match } = this.props;
    if (match.path[1] === 'c') {
      loadcategories('comidas');
    } else {
      loadcategories('bebidas');
    }
  }

  async handleClick(valor) {
    const { match, setfilterrecipes, loadrecipes } = this.props;
    const { categoriaAtual } = this.state;
    if (categoriaAtual !== valor && valor !== 'All') {
      this.setState({
        categoriaAtual: valor,
      });
      let filterCategory;
      if (match.path[1] === 'c') {
        filterCategory = await fetchFoodCategory(valor, 'comidas');
      } else {
        filterCategory = await fetchFoodCategory(valor, 'bebidas');
      }
      setfilterrecipes(filterCategory);
    } else {
      if (match.path[1] === 'c') {
        loadrecipes('comidas');
      } else {
        loadrecipes('bebidas');
      }
      this.setState({
        categoriaAtual: 'All',
      });
    }
  }

  render() {
    const { categorias } = this.props;
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          className="btn btn-outline-success"
          data-testid="All-category-filter"
          type="button"
          onClick={ () => this.handleClick('All') }
        >
          All
        </button>
        { categorias.map((categoria) => (
          <button
            className="btn btn-outline-success"
            name={ categoria.strCategory }
            type="button"
            data-testid={ `${categoria.strCategory}-category-filter` }
            key={ categoria.strCategory }
            onClick={ ({ target }) => this.handleClick(target.name) }
          >
            {categoria.strCategory}
          </button>
        )) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tipo: state.fastFood.tipo,
  categorias: state.fastFood.categorias,
});

const mapDispatchToProps = (dispatch) => ({
  loadcategories: (e) => dispatch(loadCategories(e)),
  setfilterrecipes: (e) => dispatch(setFilterRecipes(e)),
  loadrecipes: (e) => dispatch(loadRecipes(e)),
});

Categories.propTypes = {
  match: PropTypes.objectOf().isRequired,
  categorias: PropTypes.arrayOf().isRequired,
  loadcategories: PropTypes.func.isRequired,
  setfilterrecipes: PropTypes.func.isRequired,
  loadrecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
