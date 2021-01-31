import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CardBebidas extends Component {
  render() {
    const { resultApiByName } = this.props;
    return (
      <div>
        { resultApiByName.map((drink, index) => {
          const DOZE = 12;
          if (index < DOZE) {
            return (
              <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
                <img
                  src={ drink.strDrinkThumb }
                  alt="recipe pic"
                  data-testid={ `${index}-card-img` }
                />
                <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
              </div>
            );
          }
          return null; // referência: Brenda Lima;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultApiByName: state.reducerBebidas.recipesByNameBebida,
});

CardBebidas.propTypes = {
  resultApiByName: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(CardBebidas);
