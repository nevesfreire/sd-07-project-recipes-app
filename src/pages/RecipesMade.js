import React from 'react';
import perfilIcon from '../images/profileIcon.svg';
import { Link } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import { ZERO } from '../services/helpers'

function RecipesMade() {
    const recipesMade = JSON.parse(localStorage.getItem('doneRecipes'));
    const TWO = 2;
    return (
        <div>
            <header>
                <h1 data-testid="page-title">
                    Receitas Feitas
        </h1>
                <Link to="/perfil">
                    <button type="button">
                        <img
                            data-testid="profile-top-btn"
                            src={perfilIcon}
                            alt="perfil"
                        />
                    </button>
                </Link>
            </header>
            <div>
                <button data-testid="filter-by-all-btn" >All</button>
                <button data-testid="filter-by-food-btn" >Food</button>
                <button data-testid="filter-by-drink-btn" >Drinks</button>
            </div>
            {recipesMade ? recipesMade.map((recipe, index) => {
                if (recipe.type === 'food') {
                    return (
                        <div key={index} >
                            <p data-testid={`${index}-horizontal-name`} >{recipe.name}</p>
                            <p data-testid={`${index}-horizontal-top-text`} >{`${recipe.area} - ${recipe.category}`}</p>
                            <img data-testid={`${index}-horizontal-image`} alt="recipe" src={recipe.image} />
                            <button>
                                <img data-testid={`${index}-horizontal-share-btn`} alt="share" src={share} />
                            </button>
                            <p data-testid={`${index}-horizontal-done-date`} >{recipe.doneDate}</p>
                            <p>
                                {recipe.tags.slice(ZERO, TWO).map((tag, indexTag) => <p data-testid={`${indexTag}-${tag}-horizontal-tag`} key={indexTag} >{tag}</p>)}
                            </p>
                        </div>

                    )
                }
                return (
                    <div key={index} >
                        <p>{recipe.alcoholicOrNot}</p>
                        <p data-testid={`${index}-horizontal-name`} >{recipe.name}</p>
                        <p data-testid={`${index}-horizontal-top-text`} >{recipe.category}</p>
                        <img data-testid={`${index}-horizontal-image`} alt="recipe" src={recipe.image} />
                        <button>
                            <img data-testid={`${index}-horizontal-share-btn`} alt="share" src={share} />
                        </button>
                        <p>{recipe.alcoholicOrNot}</p>
                        <p data-testid={`${index}-horizontal-done-date`} >{recipe.doneDate}</p>
                    </div>
                )
            }) : null}

        </div>

    )
}

export default RecipesMade;