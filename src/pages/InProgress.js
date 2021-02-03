import React from 'react';
import { connect } from 'react-redux';

class MainRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
    };
    this.getRecipeMeal = this.getRecipeMeal.bind(this);
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const { recipes } = this.state;
    if (pathname === `/comidas/${recipes[0].idMeal}/in-progress`) {
      await this.getRecipeMeal();
  }

  async getRecipeMeal() {
    const { inProgressRecipes } = this.props;
    const recipes = await inProgressRecipes;
    this.setState({ recipes });
  }

  render() {
    return (
      <div>
        <h1>Receita em Processo</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { inProgressRecipes } }) => (
  { inProgressRecipes }
);

export default connect(mapStateToProps)(MainRecipes);
