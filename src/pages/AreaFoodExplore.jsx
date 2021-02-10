import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import './style/areaFoodExplore.css';

function AreaFoodExplore() {
  const contexto = useContext(GlobalContext);
  const { setTitle, searchByArea, setSearchByArea, setSearchButton } = contexto;
  const [areaSelected, setAreaSelected] = useState('All');
  const [recipes, setRecipes] = useState([]);

  const fetchAreas = async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(path);
    const responseJson = await response.json();
    const result = responseJson.meals.map((item) => item.strArea);
    setSearchByArea(result);
  };

  const fetchWithArea = async () => {
    // console.log(areaSelected)
    let endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSelected}`;
    if (areaSelected === 'All') {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
    }
    const response = await fetch(endpoint);
    const result = await response.json();
    // console.log(result.meals); // trazendo todas comidas por área array de obj
    const newResult = result.meals.map((item) => [
      item.strMeal,
      item.strMealThumb,
      item.idMeal,
    ]);
    // console.log(newResult) // transformação para array de array
    const twelve = 12;
    const forty = 40;
    const elementRemove = newResult.splice(twelve, forty); // removendo objetos há  partir do indice 12
    console.log(elementRemove); // apenas os objetos removidos
    // console.log(newResult)
    setRecipes(newResult);
  };

  const handleChange = (e) => {
    // console.log(e.target.value)
    setAreaSelected(e.target.value);
  };

  useEffect(() => {
  }, [areaSelected]);

  useEffect(() => {
    setTitle('Explorar Origem');
    setSearchButton(true);
    fetchAreas();
    fetchWithArea();
  }, [areaSelected]);

  return (
    <div className="origin-container">
      <label htmlFor="country">
        Choose your country
        <select
          name="country"
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
          className="origin-select"
        >
          {searchByArea.map((item, index) => (
            <option
              key={ index }
              value={ item }
              data-testid={ `${item}-option` }
            >
              { item }
            </option>
          ))}
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
        </select>
      </label>
      <div className="cards-container">
        {recipes.map((item, index) => (
          <Link
            to={ `/comidas/${item[2]}` }
            key={ index }
          >
            <div
              className="origin-food-card"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="origin-food-image"
                src={ item[1] }
                alt={ item[0] }
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
                className="origin-food-name"
              >
                { item[0] }
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AreaFoodExplore;
