import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context/Provider';
import { fetchApi } from '../../services/api';
import { initialize, getItem, saveItem } from '../../services/localStorage';
import IngredientsTable from '../../components/IngredientsTable';
import Actions from './Actions';
import './style.css';

const getIngredients = (acc, curr) => (
  curr[0].includes('strIngredient') && curr[1] !== '' && curr[1] !== null
    ? [...acc, curr[1]]
    : acc
);

const getMeasures = (acc, curr) => (
  curr[0].includes('strMeasure') && curr[1] !== '' && curr[1] !== null
    ? [...acc, curr[1]]
    : acc
);

const getIngredientsList = (list) => {
  const ing = Object.entries(list).reduce(getIngredients, []);
  const meas = Object.entries(list).reduce(getMeasures, []);

  const ingredientsList = [];

  ing.forEach((_, index) => {
    ingredientsList.push(`${ing[index]} - ${meas[index]}`);
  });

  return ingredientsList;
};

const formatData = (data) => ({
  id: data.idMeal || data.idDrink,
  name: data.strMeal || data.strDrink,
  image: data.strMealThumb || data.strDrinkThumb,
  category: data.strCategory,
  instructions: data.strInstructions,
  video: data.strYoutube || '',
  ingredients: getIngredientsList(data),
  alcoholic: data.strAlcoholic !== undefined,
  area: data.strArea || '',
  tags: data.strTags ? data.strTags.trim().split(',') : [],
});

function Progress({ history, match: { params: { id } } }) {
  const {
    api,
    setApi,
  } = useContext(Context);
  const { pathname } = history.location;
  const [result, setResult] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [done, setDone] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [canFinish, setFinish] = useState(false);
  const [data, setData] = useState({
    id: '',
    name: '',
    image: '',
    category: '',
    instructions: '',
    ingredients: [],
    video: '',
    alcoholic: false,
    area: '',
    tags: [],
  });

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (api === '') return;
    setFinish(!done.every((check) => check === true));
  }, [api, done]);

  useEffect(() => {
    if (pathname.includes('bebidas')) setApi('drink');
    else setApi('meal');
  }, [pathname, setApi]);

  useEffect(() => {
    if (api === '') return;
    const firstFetch = async () => {
      const dat = await fetchApi(id, 'recipe', api);
      if (!dat) return;
      setResult(dat[0]);
    };
    firstFetch();
  }, [api, id, setResult]);

  useEffect(() => {
    if (!result) return;
    if (!Object.keys(result).length) return;

    const formatedData = formatData(result);
    setData(formatedData);
  }, [result]);

  useEffect(() => {
    if (api === '' || !result) return;
    const ing = [];
    const meas = [];
    const don = [];
    const twenty = 20;
    for (let index = 1; index <= twenty; index += 1) {
      if (!result[`strIngredient${index}`]) break;
      ing[index - 1] = result[`strIngredient${index}`];
      meas[index - 1] = result[`strMeasure${index}`] || '';
      don[index - 1] = false;
    }
    const recipesInProgress = getItem('inProgressRecipes') || [];
    let doneIng = [];
    if (api === 'meal') {
      doneIng = [...recipesInProgress.meals[id] || ''];
    } else {
      doneIng = [...recipesInProgress.cocktails[id] || ''];
    }
    doneIng.forEach((index) => { don[index] = true; });
    setIngredients(ing);
    setMeasures(meas);
    setDone(don);

    const favoriteRecipesArray = getItem('favoriteRecipes') || [];
    const isRecipeFavorite = favoriteRecipesArray
      .some((recipe) => recipe.id === id);
    if (isRecipeFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  }, [result, api, id]);

  useEffect(() => {
    if (api === 'meal') {
      setName('strMeal');
      setImage('strMealThumb');
    } else {
      setName('strDrink');
      setImage('strDrinkThumb');
    }
  }, [api]);

  useEffect(() => {
    if (api === '' || !result) return;
    const doneIngredients = done
      .map((ing, index) => {
        if (ing === true) return index;
        return false;
      })
      .filter((ing) => ing !== false);
    const newRecipesInProgress = getItem('inProgressRecipes') || [];
    if (pathname.includes('comidas')) {
      newRecipesInProgress.meals[id] = doneIngredients;
    } else {
      newRecipesInProgress.cocktails[id] = doneIngredients;
    }
    saveItem('inProgressRecipes', newRecipesInProgress);
  }, [id, api, done, result]);

  return (
    <section>
      {result && (
        <>
          <img
            className="detail__image"
            data-testid="recipe-photo"
            src={ result[image] }
            alt="thumbnail"
          />
          <div
            className="detail__header"
            style={ { padding: '15px 30px 0' } }
          >
            <div>
              <p
                data-testid="recipe-title"
                className="detail__title"
              >
                {result[name]}
              </p>
              <p
                data-testid="recipe-category"
                className="detail__category"
              >
                { result.strCategory }
              </p>
            </div>
            <Actions
              data={ data }
              isFavorite={ isFavorite }
              setIsFavorite={ setIsFavorite }
              canFinish={ canFinish }
            />
          </div>
        </>
      )}
      <div style={ { padding: '0 30px', marginBottom: 52 } }>
        <p className="detail__field">Lista de Ingredientes:</p>
        <div className="detail__box">
          <IngredientsTable
            ingredients={ ingredients }
            measures={ measures }
            done={ done }
            setDone={ setDone }
          />
        </div>
        <p className="detail__field" style={ { paddingTop: 10 } }>Instruções:</p>
        {result && (
          <p
            data-testid="instructions"
            className="detail__box"
          >
            {result.strInstructions}
          </p>
        )}
      </div>
    </section>
  );
}

Progress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Progress;
