import React from 'react';
import { connect } from 'react-redux';

class Recipes extends React.Component {
  renderRecipes() {
    const { mealsState } = this.props;
    if (mealsState.length === 1) {
      console.log(mealsState);
    }
  }

  render() {
    return <div>teste</div>;
  }
}

const mapStateToProps = (state) => ({
  mealsState: state.meals.meals,
});

export default connect(mapStateToProps, null)(Recipes);
