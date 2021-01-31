import React, {useContext, useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
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

  const {
    getRecipeTitle,
    setRecipeTitle,
    getRecipeImage,
    setRecipeImage,
    getRecipeArea,
    setRecipeArea,
    getRecipeAlc,
    setRecipeAlc,
    getRecipeCategory,
    setRecipeCategory,
    getRecipeIngredients,
    setRecipeIngredients,
    getRecipeInstructions,
    setRecipeInstructions,
    getRecipeVideo,
    setRecipeVideo,
    getRecipeRecommendations,
    setRecipeRecommendations,
    getRecipeTags,
    setRecipeTags,
    searchTerm,
    setSearchTerm,
    recipesDone,
    setRecipesDone,
    recipesInProgress,
    setRecipesInProgress,
    setTitle
  } = context;

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

  function returnAlcoholOrNot(value) {
    if (value === null) {
      return "no"
    }
    return "yes"
  }

  const saveFavoriteRecipe = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = {
      id,
      type: 'comida',
      area: getRecipeArea,
      category: getRecipeCategory,
      alcoholicOrNot: returnAlcoholOrNot(getRecipeAlc),
      name: getRecipeTitle,
      image: getRecipeImage,
    };
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
  };

  const unLikeRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const unSave = recipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
  };

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe();
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe();
    }
  };

  const handleClick = () => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressRecipes = {
        meals: {
          [id]: [],
        },
        cocktails: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const previousObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const previousMeals = previousObj.meals;
      const newMeals = { ...previousMeals, [id]: [] };
      const newObj = {
        ...previousObj,
        meals: newMeals,
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
    const path = `/comidas/${id}/in-progress`;
    setRecipesInProgress(recipesInProgress.concat(id));
    props.history.push(path);
  };
  
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

  const setButtonTitle = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
      const recipesIds = Object.keys(recipes);
      const findElement = recipesIds.find((recipeId) => recipeId === id);
      if (findElement !== undefined) {
        setBtnTitle('Continuar Receita');
      }
    }
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

  const videoMount = (value) => {
    const lastIndex = value.meals[0].strYoutube.lastIndexOf('=');
    const videoId = value.meals[0].strYoutube.slice(lastIndex + 1);
    const newVideoPath = `https://www.youtube.com/embed/${videoId}`;
    setRecipeVideo(newVideoPath);
  };

  const fetchRecipe = useCallback(async () => {
    // hard code
    const path = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    // const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
   const getRecipe = await fetch(path);
    // console.log(getRecipe);
    const result = await getRecipe.json();
    // console.log(result)
    setRecipeTitle(result.meals[0].strMeal);
    setRecipeCategory(result.meals[0].strCategory);
    setRecipeImage(result.meals[0].strMealThumb);
    setRecipeInstructions(result.meals[0].strInstructions);
    setRecipeArea(result.meals[0].strArea);
    setRecipeVideo(result.meals[0].strYoutube);
    setRecipeAlc(result.meals[0].strDrinkAlternate);
    setRecipeTags(result.meals[0].strTags);
    videoMount(result);
    ingredientsMount(result);
  }, [
    // setRecipeId,
    setRecipeTitle,
    setRecipeCategory,
    setRecipeImage,
    setRecipeInstructions,
    setRecipeArea,
    setRecipeVideo,
    setRecipeAlc,
    setRecipeTags,
    videoMount,
    ingredientsMount,
  ]);

  const fetchRecommendations = useCallback(async () => {
    // hard code
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
    // const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(path);
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

  const setLikeImage = () => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const findElement = recipes.find((item) => item.id.toString() === id);
      if (findElement !== undefined) {
        setBtnImg(fullLikeIcon);
      } else {
        setBtnImg(likeIcon);
      }
    } else {
      setBtnImg(likeIcon);
    }
  };

  useEffect(() => {
    fetchRecipe()
    fetchRecommendations()
    setLikeImage()
    setButtonTitle()
  },[]);
  
  useEffect(() => {
    setTitle('Food Details');
  }, [setTitle]);

  return (
    <div>
      {/* hard code */}
      <img
        src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
        alt="Aquamarine"
        data-testid="recipe-photo"
      />

      {/* <img src={recipeImage} alt={recipeTitle} data-testid="recipe-photo" /> */}
      {/* hard code */}
      <p data-testid="recipe-title">Spicy Arrabiata Penne</p>
      {/* <p data-testid="recipe-title">{getRecipeTitle}</p> */}
      <div>
        <button type="button" onClick={handleImage} className="favorite-btn">
          <img src={btnImg} alt="like" data-testid="favorite-btn" />
        </button>
        <ShareButton path={pathname} />
      </div>
      <p>
        Category-
        {/* hard code */}
        <span data-testid="recipe-category">Vegetarian</span>
        {/* <span data-testid="recipe-category">{getRecipeCategory}</span> */}
      </p>
      {/* hard code */}
      <li data-testid="0-ingredient-name-and-measure">penne rigate</li>
      <li data-testid="0-ingredient-name-and-measure">1 pound</li>
      <li data-testid="1-ingredient-name-and-measure">olive oil</li>
      <li data-testid="1-ingredient-name-and-measure">1/4 cup</li>
      <li data-testid="2-ingredient-name-and-measure">garlic</li>
      <li data-testid="2-ingredient-name-and-measure">3 cloves</li>
      <li data-testid="3-ingredient-name-and-measure">chopped tomatoes</li>
      <li data-testid="3-ingredient-name-and-measure">1 tin</li>
      <li data-testid="4-ingredient-name-and-measure">red chile flakes</li>
      <li data-testid="4-ingredient-name-and-measure">1/2 teaspoon</li>
      <li data-testid="5-ingredient-name-and-measure">italian seasoning</li>
      <li data-testid="5-ingredient-name-and-measure">1/2 teaspoon</li>
      <li data-testid="6-ingredient-name-and-measure">basil</li>
      <li data-testid="6-ingredient-name-and-measure">6 leaves</li>
      <li data-testid="7-ingredient-name-and-measure">Parmigiano-Reggiano</li>
      <li data-testid="7-ingredient-name-and-measure">spinkling</li>

      {/* <ul>
        {(getRecipeIngredients.map((item, index) => (
          <li key={index} data-testid={`${index}-ingredient-name-and-measure`}>
            {item}
          </li>
        )))}
      </ul> */}
      {/* hard code */}
      <h3 data-testid="instructions">
        'Bring a large pot of water to a boil. Add kosher salt to the boiling
        water, then add the pasta. Cook according to the package instructions,
        about 9 minutes.\r\nIn a large skillet over medium-high heat, add the
        olive oil and heat until the oil starts to shimmer. Add the garlic and
        cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped
        tomatoes, red chile flakes, Italian seasoning and salt and pepper to
        taste. Bring to a boil and cook for 5 minutes. Remove from the heat and
        add the chopped basil.\r\nDrain the pasta and add it to the sauce.
        Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.'
      </h3>
      {/* <h3 data-testid="instructions">{getRecipeInstructions}</h3> */}
      {/* hard code */}
      <iframe
        src="https://www.youtube.com/watch?v=1IszT_guI08"
        title="Spicy Arrabiata Penne"
        data-testid="video"
      />
      {/* <iframe src={getRecipeVideo} title={getRcipeTitle} data-testid="video" /> */}
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
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={handleClick}
        >
          {btnTitle}
        </button>
      )}
    </div>
  );  
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};
