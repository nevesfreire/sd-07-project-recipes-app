import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRandomMeals } from '../actions/meals';
import Header from '../components/Header';
import Footer from '../components/Footer';

class MealsOrigin extends React.Component {
  componentDidMount() {
    const { searchRandomMeals } = this.props;
    searchRandomMeals();
  }

  render() {
    const { meals } = this.props;
    const areas = meals.map((meal) => (meal.strArea)).sort();
    console.log(areas)
    return (
      <div>
        <Header title="Explorar Origem" />
        <div>
          <select data-testid="explore-by-area-dropdown">
            {areas.map((strArea) => (
              <option
                key={ strArea }
                data-testid={ `${strArea}-option` }
              >
                { strArea }
              </option>
            ))}
          </select>
        </div>
        <Footer />
      </div>
    );
  }
}

MealsOrigin.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchRandomMeals: PropTypes.func.isRequired,
};

const mapStateToProps = ({ meals }) => ({
  meals: meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealsOrigin);
