import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CocktailCard from '../components/CocktailCard';
import {
  fetchRandomCocktails,
  fetchCocktailsCategories,
} from '../actions/cocktails';

class Cocktails extends Component {
  componentDidMount() {
    const { searchCocktailsCategories, searchRandomCocktails } = this.props;
    searchRandomCocktails();
    searchCocktailsCategories();
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { cocktails } = this.props;
    const firstCocktails = cocktails.slice(zero, maxLength);
    return (
      <div>
        <Header title="Bebidas" />
        { firstCocktails.map((cocktail, index) => (
          <CocktailCard
            key={ index }
            cocktail={ cocktail }
            index={ index }
            testid="recipe-card"
          />
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ cocktails }) => ({
  cocktails: cocktails.cocktails,
});

const mapDispatchToProps = (dispatch) => ({
  searchCocktailsCategories: () => dispatch(fetchCocktailsCategories()),
  searchRandomCocktails: () => dispatch(fetchRandomCocktails()),
});

Cocktails.propTypes = {
  cocktails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchCocktailsCategories: PropTypes.func.isRequired,
  searchRandomCocktails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);
