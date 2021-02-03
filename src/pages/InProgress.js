import React from 'react';
import { connect } from 'react-redux';

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
    return (
      <div>
        <h1>Receita em Processo</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { inProgressRecipes, inProgressRecipesDrink } }) => (
  { inProgressRecipes }
);

export default connect(mapStateToProps)(MainRecipes);
