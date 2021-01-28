import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import {
  fetchFoodByIngredient,
  fetchFoodByName,
  fetchFoodByFirstLetter,
} from '../../redux/actions/foodActions';
import {
  fetchCocktailByIngredient,
  fetchCocktailByName,
  fetchCocktailByFirstLetter,
} from '../../redux/actions/drinkActions';

function SearchBar({ foodType, fi, fn, fl, ci, cn, cl, cocktails, meals }) {
  const [type, setType] = useState('ingredient');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log(type, searchTerm);
  }, [type, searchTerm]);

  const handleStore = () => {
    if (foodType === 'comidas') {
      switch (type) {
      case 'ingredient':
        fi(searchTerm);
        break;
      case 'name':
        fn(searchTerm);
        break;
      case 'primLetra':
        if (searchTerm.length > 1) {
          console.log(searchTerm.length);
          return alert('Sua busca deve conter somente 1 (um) caracter');
        }
        fl(searchTerm);
        break;

      default:
        console.log('eu nunca devo ser printado :D');
        break;
      }
    } else {
      switch (type) {
      case 'ingredient':
        ci(searchTerm);
        break;
      case 'name':
        cn(searchTerm);
        break;
      case 'primLetra':
        if (searchTerm.length > 1) {
          console.log(searchTerm.length);
          return alert('Sua busca deve conter somente 1 (um) caracter');
        }
        cl(searchTerm);
        break;

      default:
        console.log('eu nunca devo ser printado :D');
        break;
      }
    }
  };

  return (
    <div>
      <button data-testid="search-top-btn" type="button">Faz de conta que é serio</button>
      <form className="search-form-wrapper">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setSearchTerm(e.currentTarget.value) }
          className="form-input"
        />
        <div onChange={ (e) => setType(e.target.value) } className="search-wrap-radio">
          <label htmlFor="ing" className="search-label">
            <input
              type="radio"
              id="ing"
              name="type"
              value="ingredient"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="nam" className="search-label">
            <input
              type="radio"
              id="nam"
              name="type"
              value="name"
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="pletra" className="search-label">
            <input
              type="radio"
              id="pletra"
              name="type"
              value="primLetra"
              data-testid="first-letter-search-radio"
            />
            Primeira Letra
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleStore }
          className="form-button"
        >
          Buscar
        </button>
      </form>
      {meals !== null
        && meals.map((meal, index) => <p key={ index }>{meal.strMeal}</p>)}
      {cocktails !== null
        && cocktails.map((cocktail, index) => (
          <p key={ index }>{cocktail.strDrink}</p>
        ))}
    </div>
  );
}

const mapStateToProps = ({
  cocktailsDrinks: { cocktails },
  foodMeals: { meals },
}) => ({
  cocktails,
  meals,
});

const mapDispatchToProps = {
  fi: fetchFoodByIngredient,
  fn: fetchFoodByName,
  fl: fetchFoodByFirstLetter,
  ci: fetchCocktailByIngredient,
  cn: fetchCocktailByName,
  cl: fetchCocktailByFirstLetter,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
