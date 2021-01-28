import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCategories, setFilterRecipes, loadRecipes } from '../redux/action';
import { fetchFoodCategory } from '../services';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlAPI: props.tipo,
      categoriaAtual: 'All',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { loadcategories, tipo } = this.props;
    loadcategories(tipo);
  }

  async handleClick(valor) {
    const { tipo, setfilterrecipes, loadrecipes } = this.props;
    const { categoriaAtual } = this.state;
    if (categoriaAtual !== valor && valor !== 'All') {
      this.setState({
        categoriaAtual: valor,
      });
      const filterCategory = await fetchFoodCategory(valor, tipo);
      setfilterrecipes(filterCategory);
    } else {
      loadrecipes(tipo);
      this.setState({
        categoriaAtual: 'All',
      });
    }
  }

  render() {
    const { categorias, tipo, loadcategories } = this.props;
    const { controlAPI } = this.state;
    if (controlAPI !== tipo) {
      this.setState({
        controlAPI: tipo,
      });
      loadcategories(tipo);
    }
    return (
      <div>
        <button
          type="button"
          onClick={ () => this.handleClick('All') }
        >
          All
        </button>
        { categorias.map((categoria) => (
          <button
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
  tipo: PropTypes.string.isRequired,
  categorias: PropTypes.arrayOf().isRequired,
  loadcategories: PropTypes.func.isRequired,
  setfilterrecipes: PropTypes.func.isRequired,
  loadrecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
