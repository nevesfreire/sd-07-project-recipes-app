import React, {useContext, useState, useEffect, useCallback} from 'react';
import GlobalContext from '../context/GlobalContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';

export default function FoodDetails(props) {
  const context = useContext(GlobalContext);
  const [btnTitle, setBtnTitle] = useState('Iniciar Receita');
  const [btnImg, setBtnImg] = useState('');
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
  const { recipeObject } = context;

  const {
    recipeAlc,
    recipeArea,
    recipeCategory,
    recipeId,
    recipeImage,
    recipeIngredients,
    recipeInstructions,
    recipeRecommendations,
    recipeTags,
    recipeTitle,
    recipeVideo,
    recipesDone,
    recipesInProgress,
    searchTerm,
    setTitle,
    setRecipeAlc,
    setRecipeArea,
    setRecipeCategory,
    setRecipeId,
    setRecipeImage,
    setRecipeIngredients,
    setRecipeInstructions,
    setRecipeRecommendations,
    setRecipeTags,
    setRecipeTitle,
    setRecipeVideo,
    setRecipesDone,
    setRecipesInProgress,
    setSearchTerm,
  } = recipeObject;
  const {
    match,
    history: {
      location: { pathname },
    },
  } = props;
  const { params } = match;
  const { id } = params;
  const carouselActiveIndex = 0;
  const carouselPartition = 3;

  const buttonMount = () => {
    if (localStorage.getItem('doneRecipes') !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const findElement = doneRecipes.find((item) => item.id === id);
      if (findElement !== undefined) {
        return false;
      }
    }
    return true;
  };

  const ingredientsMount = (jsonRecipe) => {
    const initialIndex = 0;
    const halfIndex = 2; // importante para pegar o valor das quantidades
    const ingredients = Object.entries(jsonRecipe.meals[0])
    // console.log(ingredients); array 2 chave e valor do retorno da API
      .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
      // console.log(ingredients); trazendo igrediente + quantidade
      // está trazendo algumas linhas de array vazio
      .filter((amount) => amount[1] !== null && amount[1] !== ' ' && amount[1] !== '')
      // console.log(ingredients) todos arrays sem vazios
        .map((ar2) => ar2[1]);
      // console.log(ingredients)
    const ingredientsMeasures = [];
    for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
      ingredientsMeasures
        .push(`${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`);
    }
    // console.log(ingredientsMeasures) // concatenação de igredientes e quantidades
    setRecipeIngredients(ingredientsMeasures);
  };

  const fetchRecipe = async () => {
    // hard code
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
    // const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(url);
    // console.log(getRecipe);
    const result = await getRecipe.json();
    // console.log(result)
    setRecipeId(result.meals[0].idMeal);
    setRecipeTitle(result.meals[0].strMeal);
    setRecipeCategory(result.meals[0].strCategory);
    setRecipeImage(result.meals[0].strMealThumb);
    setRecipeInstructions(result.meals[0].strInstructions);
    setRecipeArea(result.meals[0].strArea);
    setRecipeVideo(result.meals[0].strYoutube);
    setRecipeAlc(result.meals[0].strDrinkAlternate);
    setRecipeTags(result.meals[0].strTags);
    ingredientsMount(result);
  };
  
  
  useEffect(() => {
    setTitle('Food Details');
    fetchRecipe();
    // fetchRecommendations();
    // setButtonTitle();
    // setLikeImage();
  }, [setTitle, fetchRecipe]);

  // console.log(recipeIngredients[0]) chegando undefinido

  return (
    <div>
      <img src={recipeImage} alt={recipeTitle} data-testid="recipe-photo" />
      <p data-testid="recipe-title">{recipeTitle}</p>
      <div>
        {/* dentro do btn fazer onClick={handleImage} */}
        <button type="button"> 
          <img src={btnImg} alt="like" data-testid="favorite-btn" />
          <ShareButton path={pathname} />
        </button>
      </div>
      <p>
        Category-
        <span data-testid="recipe-category">{recipeCategory}</span>
      </p>
      {/* hard code */}
      {/* <ul>
        <li data-testid='0-ingredient-name-and-measure'>Açucar</li>
        <li data-testid='1-ingredient-name-and-measure'>Açucar</li>
        <li data-testid='2-ingredient-name-and-measure'>Açucar</li>
        <li data-testid='3-ingredient-name-and-measure'>Açucar</li>
      </ul> */}
      <ul>
        {(recipeIngredients.map((item, index) => (
          <li key={index} data-testid={`${index}-ingredient-name-and-measure`}>
            {item}
          </li>
        )))}
      </ul>
      <h3 data-testid="instructions">{recipeInstructions}</h3>
      <iframe src={recipeVideo} title={recipeTitle} data-testid="video" />
      <h3>Recommendations:</h3>
      <div>
        <div>
          <div>
            {/* hard code */}
            <div data-testid='0-recomendation-card'>
              <h5 data-testid='0-recomendation-title'>Titulo 1</h5>
            </div>
            <div data-testid='1-recomendation-card'>
            <h5 data-testid='1-recomendation-title'>Titulo 2</h5>
            </div>
            {/* {recommendations1.map((item, index) => {
              if (index === carouselActiveIndex) {
                return (
                  <div
                    key={item.strDrink}
                    data-testid={`${index}-recomendation-card`}
                  >
                    <img src={item.strDrinkThumb} alt={item.strDrink} />
                    <h5 data-testid={`${index}-recomendation-title`}>
                      {item.strDrink}
                    </h5>
                  </div>
                );
              }
              return (
                <div
                  key={item.idDrink}
                  data-testid={`${
                    index + carouselActiveIndex1
                  }-recomendation-card`}
                >
                  <img src={item.strDrinkThumb} alt={item.strDrink} />
                  <h5 data-testid={`${index}-recomendation-title`}>
                    {item.strDrink}
                  </h5>
                </div>
              );
            })} */}
          </div>
        </div>
        <div>
          <div>
            {recommendations2.map((item, index) => {
              if (index === carouselActiveIndex) {
                return (
                  <div key={item.idDrink} data-testid="1-recomendation-card">
                    <img src={item.strDrinkThumb} alt={item.strDrink} />
                    <h5
                      data-testid={`${
                        index + carouselPartition
                      }-recomendation-title`}
                    >
                      {item.strDrink}
                    </h5>
                  </div>
                );
              }
              return (
                <div
                  key={item.idDrink}
                  data-testid={`${
                    index + carouselPartition
                  }-recomendation-card`}
                >
                  <img src={item.strDrinkThumb} alt={item.strDrink} />
                  <h5
                    data-testid={`${
                      index + carouselPartition
                    }-recomendation-title`}
                  >
                    {item.strDrink}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {buttonMount() && (
        // fazer onClick={handleClick}
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          {btnTitle}
        </button>
      )}
    </div>
  );  
}
