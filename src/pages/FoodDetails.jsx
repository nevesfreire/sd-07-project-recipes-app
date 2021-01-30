import React, {useContext, useState, useEffect, useCallback} from 'react';
import GlobalContext from '../context/GlobalContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';

export default function FoodDetails(props) {
  const context = useContext(GlobalContext);
  // console.log(context);
  const [btnTitle, setBtnTitle] = useState('Iniciar Receita');
  const [btnImg, setBtnImg] = useState('');
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
  const { recipeObject } = context;
  // console.log(recipeObject);

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
  const carouselActiveIndex = 0; //controle de recomendações
  const carouselActiveIndex1 = 1;
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

  const ingredientsMount = useCallback((jsonRecipe) => {
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
  }, [setRecipeIngredients]);

  const fetchRecipe = useCallback(async () => {
    // hard code
    const path = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    // const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
   const getRecipe = await fetch(path);
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
  }, [
    setRecipeId,
    setRecipeTitle,
    setRecipeCategory,
    setRecipeImage,
    setRecipeInstructions,
    setRecipeArea,
    setRecipeVideo,
    setRecipeAlc,
    setRecipeTags,
    ingredientsMount,
  ]);

  const fetchRecommendations = useCallback(async () => {
    // hard code
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
    // const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(path);
    // console.log(getDrink);
    const result = await response.json();
    const maximumRecommendations1 = 3;
    const maximumRecommendations2 = 6;
    const getRecommendations1 = result.drinks.filter(
      (recommendation, index) => (index < maximumRecommendations1 && recommendation),
    );
    // console.log(getRecommendations1);
    const getRecommendations2 = result.drinks.filter(
      (recommendation, index) => (
        index >= maximumRecommendations1
        && index < maximumRecommendations2
        && recommendation
      ),
    );
    setRecommendations1(getRecommendations1);
    setRecommendations2(getRecommendations2);
  }, [setRecommendations1, setRecommendations2]);
    // console.log(result);
//     drinks: Array(1)
// 0:
// dateModified: null
// idDrink: "178319"
// strAlcoholic: "Alcoholic"
// strCategory: "Cocktail"
// strCreativeCommonsConfirmed: "No"
// strDrink: "Aquamarine"
// strDrinkAlternate: null
// strDrinkDE: null
// strDrinkES: null
// strDrinkFR: null
// strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
// strDrinkZH-HANS: null
// strDrinkZH-HANT: null
// strGlass: "Martini Glass"
// strIBA: null
// strImageAttribution: null
// strImageSource: null
// strIngredient1: "Hpnotiq"
// strIngredient2: "Pineapple Juice"
// strIngredient3: "Banana Liqueur"
// strIngredient4: ""
// strIngredient5: ""
// strIngredient6: ""
// strIngredient7: ""
// strIngredient8: null
// strIngredient9: null
// strIngredient10: null
// strIngredient11: null
// strIngredient12: null
// strIngredient13: null
// strIngredient14: null
// strIngredient15: null
// strInstructions: "Shake well in a shaker with ice.
// ↵Strain in a martini glass."
// strInstructionsDE: null
// strInstructionsES: null
// strInstructionsFR: null
// strInstructionsZH-HANS: null
// strInstructionsZH-HANT: null
// strMeasure1: "2 oz"
// strMeasure2: "1 oz"
// strMeasure3: "1 oz"
// strMeasure4: ""
// strMeasure5: ""
// strMeasure6: ""
// strMeasure7: ""
// strMeasure8: null
// strMeasure9: null
// strMeasure10: null
// strMeasure11: null
// strMeasure12: null
// strMeasure13: null
// strMeasure14: null
// strMeasure15: null
// strTags: null
// strVideo: null
// __proto__: Object

  useEffect(() => {
    fetchRecipe()
    fetchRecommendations()
  },[]);
  
  useEffect(() => {
    setTitle('Food Details');
  }, [setTitle]);

  // console.log(recipeIngredients[0]) chegando indefinido

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
      <ul>
        <li data-testid='0-ingredient-name-and-measure'>Açucar</li>
        <li data-testid='1-ingredient-name-and-measure'>Açucar</li>
        <li data-testid='2-ingredient-name-and-measure'>Açucar</li>
        <li data-testid='3-ingredient-name-and-measure'>Açucar</li>
      </ul>
      {/* <ul>
        {(recipeIngredients.map((item, index) => (
          <li key={index} data-testid={`${index}-ingredient-name-and-measure`}>
            {item}
          </li>
        )))}
      </ul> */}
      <h3 data-testid="instructions">{recipeInstructions}</h3>
      <iframe src={recipeVideo} title={recipeTitle} data-testid="video" />
      <h3>Recommendations:</h3>
      <div>
        <div>
          <div>
            {recommendations1.map((item, index) => {
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
            })}
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
