import React from 'react';
import { connect } from 'react-redux';
import InProgressDrinks from '../components/InProgressDrinks';
import InProgressMeals from '../components/InProgressMeals';
import Loading from '../components/Loading';

class MainRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: {},
      recipesDrinks: {},
    };
    this.getRecipeMeal = this.getRecipeMeal.bind(this);
  }

  async componentDidMount() {
    await this.getRecipeMeal();
  }

  async getRecipeMeal() {
    const { inProgressRecipes, inProgressRecipesDrink } = this.props;
    const recipes = await inProgressRecipes;
    this.setState({ recipes });
    const recipesDrinks = await inProgressRecipesDrink;
    this.setState({ recipesDrinks });
  }

  render() {
    const { location : { pathname }, inProgressRecipes, inProgressRecipesDrink } = this.props;
    return (
      <div>
        {(inProgressRecipes
          && pathname === `/comidas/${inProgressRecipes.idMeal}/in-progress`) ? (
            <InProgressMeals />) : <InProgressDrinks /> }
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { inProgressRecipes, inProgressRecipesDrink } }) => (
  { inProgressRecipes, inProgressRecipesDrink }
);

export default connect(mapStateToProps)(MainRecipes);
