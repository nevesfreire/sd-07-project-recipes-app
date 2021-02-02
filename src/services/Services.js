const zero = 0;
const twelve = 12;

export async function apiFoods(type) {
  const urlFoods = `https://www.themealdb.com/api/json/v1/1/${type}`;
  const results = await fetch(urlFoods)
    .then((response) => response.json())
    .catch((error) => console.log(`deu erro ${error}`));
  if (results.meals && results !== undefined) {
    const firstMeals = results.meals.slice(zero, twelve);
    return firstMeals;
  }
}

export async function apiDrinks(type) {
  const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/${type}`;
  const results = await fetch(urlDrinks)
    .then((response) => response.json())
    .catch((err) => console.log(`deu erro ${err}`));
  if (results !== undefined && results.drinks) {
    const firstDrinks = results.drinks.slice(zero, twelve);
    return firstDrinks;
  }
}

// Comidas:
// Ingredientes: https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// Comidas por Nome: https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
// Primeira Letra: https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
// Categorias: https://www.themealdb.com/api/json/v1/1/categories.php
// ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
// Areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
// Ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list
// Aleatória: https://www.themealdb.com/api/json/v1/1/randomselection.php

// Bebidas:
// Bebidas por Ingredientes: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}
// Bebidas por Nome: https://www.thecocktaildb.com/api/json/v1/1/search.php?s={ingrediente}
// Bebidas por Primeira Letra: https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a
// Categorias: https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
// Detalhes por ID: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
// Areas: -
// Aleatória: https://www.thecocktaildb.com/api/json/v1/1/random.php
// Ingredientes por ID: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552
