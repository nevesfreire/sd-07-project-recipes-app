import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeFetching } from '../actions';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

class Footer extends Component {
  render() {
    const { history } = this.props;
    return (
      <footer className="footer-container" data-testid="footer">
        <button
          src={ drinkIcon }
          type="button"
          data-testid="drinks-bottom-btn"
          onClick={ () => {
            // isFetching();
            history.push('/bebidas');
          } }
        >
          <img src={ drinkIcon } alt="drinkIcon" />
        </button>
        <button
          src={ exploreIcon }
          type="button"
          data-testid="explore-bottom-btn"
          onClick={ () => {
            history.push('/explorar');
            // isFetching();
          } }
        >
          <img src={ exploreIcon } alt="exploreIcon" />
        </button>
        <button
          src={ mealIcon }
          type="button"
          data-testid="food-bottom-btn"
          onClick={ () => {
            // isFetching();
            history.push('/comidas');
          } }
        >
          <img src={ mealIcon } alt="mealIcon" />
        </button>
      </footer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isFetching: () => dispatch(changeFetching()),
});

export default connect(null, mapDispatchToProps)(Footer);

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
