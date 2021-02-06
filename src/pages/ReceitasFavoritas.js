import React, { Component } from 'react';
import Header from '../components/Header';
import FavoriteAndDoneFilterButtons from '../components/FavoriteAndDoneFilterButtons';
import FavoriteRecipesList from '../components/FavoriteRecipesList';

class ReceitasFavoritas extends Component {
  constructor() {
    super();

    this.handleFilterButton = this.handleFilterButton.bind(this);
    this.saveRecipesToState = this.saveRecipesToState.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);

    this.state = {
      filterButton: 'All',
      favoriteRecipesList: [],
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
    const favoriteRecipesListOnLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesListOnLS) {
      this.setState((previous) => ({
        favoriteRecipesList: previous.favoriteRecipesList.concat(favoriteRecipesListOnLS),
      }));
    }
  }

  filterRecipes() {
    const { filterButton, favoriteRecipesList } = this.state;
    if (filterButton === 'All') {
      return favoriteRecipesList;
    }
    return favoriteRecipesList.filter((recipe) => recipe.type === filterButton);
  }

  deleteFavorite(id) {
    const { favoriteRecipesList } = this.state;
    const newFavoriteRecipesList = favoriteRecipesList.filter(
      (recipe) => !recipe.id.includes(id),
    );
    this.setState({
      favoriteRecipesList: newFavoriteRecipesList,
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesList));
  }

  render() {
    return (
      <div>
        <Header pageTitle="Receitas Favoritas" />
        <FavoriteAndDoneFilterButtons
          handleFilterButton={ this.handleFilterButton }
        />
        <FavoriteRecipesList
          filterRecipes={ this.filterRecipes }
          deleteFavorite={ this.deleteFavorite }
        />
      </div>
    );
  }
}

export default ReceitasFavoritas;
