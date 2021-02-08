import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { getFoodName, getFoodListByArea, getFilterFoodListByArea } from '../services/Api';
import ListCardsFoodCategory from '../components/ListCardsFoodCategory';

function AreaFood() {
  const { searchClick, showBtn } = useContext(RecipeContext);
  const all = ['All'];
  // const [area, setArea] = useState(['All']);
  const [areaList, setAreaList] = useState(['All']);
  const [arrayListFood, setArrayListFood] = useState([]);
  const ZERO = 0;

  useEffect(() => {
    async function foodAreaList() {
      if (arrayListFood) {
        setAreaList(await getFoodListByArea());
      }
      const fetchFoodName = await getFoodName(areaList);
      setArrayListFood(fetchFoodName);
    }
    foodAreaList();
  }, []);

  const handleChange = async ({ target: { value } }) => {
    const filterByArea = await getFilterFoodListByArea(value);
    setArrayListFood(filterByArea);
  };

  const showListFoodArea = () => areaList.map((item, index) => (
    <option
      key={ index }
      value={ item.strArea }
      data-testid={ `${item.strArea}-option` }
    >
      {item.strArea}
    </option>
  ));

  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Explorar Origem</h1>
        <label htmlFor="searchBtn">
          <input
            type="image"
            src={ searchIcon }
            alt="profile icon"
            data-testid="search-top-btn"
            id="searchBtn"
            onClick={ () => searchClick() }
          />
        </label>
        {showBtn && <SearchHeaderBar />}
      </header>
      <div>
        <label htmlFor="area">
          <select
            name="area"
            id="area"
            onChange={ handleChange }
            data-testid="explore-by-area-dropdown"
          >
            <option
              key={ all }
              // value={['All']}
              data-testid={ `${all}-option` }
            >
              {all}
            </option>
            {
              areaList.length > ZERO ? showListFoodArea() : 'Carregando..'
            }
          </select>
        </label>
      </div>
      <div>
        {
          arrayListFood ? ListCardsFoodCategory(arrayListFood) : 'Carregando..'
        }
      </div>
      <Footer />
    </div>
  );
}

export default AreaFood;

// {data.map((coin) => (
//   <option
//     key={coin}
//     value={coin}
//     data-testid={coin}
//   >
//     {coin}
//   </option>
// ))}
