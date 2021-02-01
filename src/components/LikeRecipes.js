import React from 'react';
import RecipesLiked from './RecipesLiked';

class LikeRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
    };
    this.recipesFavorited = this.recipesFavorited.bind(this);
  }

  componentDidMount() {
    this.recipesFavorited();
  }

  recipesFavorited() {
    const favoriteRecipes = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    this.setState({ favoriteRecipes });
  }

  // `[{ id, type, area, category, alcoholicOrNot, name, image }]`.

  /* [{ id: "52977", type: "Meal", area: "Turkish" , category: "Side", alcoholicOrNot: false, name: "Corba", image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" },
  { id:"15997", type:"Drink", area:"", category:"Ordinary Drink", alcoholicOrNot:true, name:"GG", image:"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg" }] */

  render() {
    const { favoriteRecipes } = this.state;
    const magicNumber = 0;
    if (!favoriteRecipes || favoriteRecipes.length === magicNumber) {
      return <h1> Você ainda não tem uma receita favorita </h1>;
    }

    return (
      <div>
        <RecipesLiked
          favoriteRecipes={ favoriteRecipes }
        />
      </div>
    );
  }
}

export default LikeRecipes;
