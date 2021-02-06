import React, { Component } from 'react';
import Header from '../components/Header';
import FavoriteAndDoneFilterButtons from '../components/FavoriteAndDoneFilterButtons';
import DoneRecipesList from '../components/DoneRecipesList';

class ReceitasFeitas extends Component {
  constructor() {
    super();

    this.handleFilterButton = this.handleFilterButton.bind(this);
    this.saveRecipesToState = this.saveRecipesToState.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);

    this.state = {
      filterButton: 'All',
      doneRecipesList: [],
    };
  }

  componentDidMount() {
    this.saveRecipesToState();
  }

  handleFilterButton({ target: { name } }) {
    if (name === 'Food') {
      name = 'comida';
    } else if (name === 'Drinks') {
      name = 'bebida';
    } else {
      name = 'All';
    }
    this.setState({
      filterButton: name,
    });
  }

  saveRecipesToState() {
    const doneRecipesListOnLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesListOnLS) {
      this.setState((previous) => ({
        doneRecipesList: previous.doneRecipesList.concat(doneRecipesListOnLS),
      }));
    }
  }

  filterRecipes() {
    const { filterButton, doneRecipesList } = this.state;
    if (filterButton === 'All') {
      return doneRecipesList;
    }
    return doneRecipesList.filter((recipe) => recipe.type === filterButton);
  }

  render() {
    return (
      <div>
        <Header pageTitle="Receitas Feitas" />
        <FavoriteAndDoneFilterButtons
          handleFilterButton={ this.handleFilterButton }
        />
        <DoneRecipesList
          filterRecipes={ this.filterRecipes }
        />
      </div>
    );
  }
}

export default ReceitasFeitas;
