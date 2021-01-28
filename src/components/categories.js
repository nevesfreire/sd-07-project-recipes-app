import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCategories, setFilterRecipes } from '../redux/action';
import { fetchFoodCategory } from '../services';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlAPI: props.tipo,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { loadcategories, tipo } = this.props;
    loadcategories(tipo);
  }

  async handleClick(valor) {
    const { tipo, setfilterrecipes } = this.props;
    const filterCategory = await fetchFoodCategory(valor, tipo);
    setfilterrecipes(filterCategory);
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
        <button type="button">All</button>
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
});

Categories.propTypes = {
  tipo: PropTypes.string.isRequired,
  categorias: PropTypes.arrayOf().isRequired,
  loadcategories: PropTypes.func.isRequired,
  setfilterrecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
