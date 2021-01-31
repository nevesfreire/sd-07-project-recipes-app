import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import FoodThumb from '../../components/FoodThumb';

function EmProgesso() {
  const { route, id } = useParams();
  console.log(route);
  console.log(id);

  return (
    <div>
      emprogresso
      <FoodThumb />
    </div>
  );
}

const mapStateToProps = (state) => ({
  meals: state.foodMeals.meals,
  drinks: state.cocktailsDrinks.cocktails,
});

export default connect(mapStateToProps)(EmProgesso);
