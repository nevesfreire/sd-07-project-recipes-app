import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRandomCocktails } from '../actions/cocktails';
// import CocktailCard from './CocktailCard';

class MealsCarousel extends Component {
  constructor() {
    super();

    this.state = {
      pages: '',
    };

    this.initialLoading = this.initialLoading.bind(this);
    this.setMealsCards = this.setMealsCards.bind(this);
  }

  componentDidMount() {
    this.initialLoading();
  }

  setMealsCards() {
    const { cocktails } = this.props;
    const zero = 0;
    const maxLength = 6;
    const firstCocktails = cocktails.slice(zero, maxLength);
    const arrayCocktails = [
      [firstCocktails[0], firstCocktails[1]],
      [firstCocktails[2], firstCocktails[3]],
      [firstCocktails[4], firstCocktails[5]],
    ];
    this.setState({
      pages: arrayCocktails,
    });
  }

  initialLoading() {
    const { searchRandomCocktails } = this.props;
    searchRandomCocktails();
    this.setMealsCards();
  }

  render() {
    const { pages } = this.state;
    this.setMealsCards();
    return (
      <div>
        Ola
      </div>
    );
  }
}

const mapStateToProps = ({ cocktails }) => ({
  cocktails: cocktails.cocktails,
});

const mapDispatchToProps = (dispatch) => ({
  searchRandomCocktails: () => dispatch(fetchRandomCocktails()),
});

MealsCarousel.propTypes = {
  cocktails: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  searchRandomCocktails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsCarousel);
