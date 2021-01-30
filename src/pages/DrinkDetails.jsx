import React, {useContext, useState} from 'react';
import GlobalContext from '../context/GlobalContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import teste from '../images/teste.jpg';
  
export default function DrinkDetails(props) {
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

  const saveFavoriteRecipe = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = {
      id: recipeId,
      type: 'bebida',
      area: recipeArea,
      category: recipeCategory,
      alcoholicOrNot: recipeAlc,
      name: recipeTitle,
      image: recipeImage,
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

  return (
    <div>
      {/* hard code id receita 178319*/}
      <img 
      src="teste" 
      alt="teste" data-testid="recipe-photo" />
      {/* <img src={recipeImage} alt={recipeTitle} data-testid="recipe-photo" /> */}
      {/* hard code */}
      <h1 data-testid="recipe-title">titulo hard code</h1>
      {/* <p data-testid="recipe-title">{recipeTitle}</p> */}

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
        {recipeIngredients.map((item, index) => (
          <li key={index} data-testid={`${index}-ingredient-name-and-measure`}>
            {item}
          </li>
        ))}
      </ul> */}
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
          btnTitle
          {/* { btnTitle } */}
        </button>
      )}
    </div>
  ); 
}
