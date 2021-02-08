import React, { useEffect, useState, useContext } from 'react';
import context from '../../context';
import { Footer, Header, Card } from '../../components';
import RequestData from '../../services/RequestAPI';
import './style.css';

function ExploreByArea() {
  const { data, activeFilter, setData, setActiveFilter } = useContext(context);

  const [areas, setAreas] = useState();
  useEffect(() => {
    RequestData('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(
      (response) => {
        setAreas(response.meals);
      },
    );
  });

  useEffect(() => {
    let URL = '';
    if (activeFilter) {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${activeFilter}`;
    } else {
      URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }

    async function fetchData() {
      await setData([]);
      let dataRequest = [];
      const { meals } = await RequestData(URL);
      dataRequest = meals;
      await setData(dataRequest);
    }
    fetchData();
  }, [setData, activeFilter]);

  function handleSelectFilter({ target }) {
    const { value } = target;
    if (value === 'All') {
      setActiveFilter(undefined);
    } else {
      setActiveFilter(value);
    }
  }

  function printRecipes() {
    if (!data.length) return <span>Carregando as receitas</span>;
    const zero = 0;
    const cardsPerPage = 12;
    return data
      .slice(zero, cardsPerPage)
      .map((item, index) => (
        <Card
          key={ index }
          index={ index }
          id={ item.idMeal }
          name={ item.strMeal }
          thumb={ item.strMealThumb }
          recipeType="comidas"
          testIdCard={ `${index}-recipe-card` }
          testIdThumb={ `${index}-card-img` }
          testIdTitle={ `${index}-card-name` }
        />
      ));
  }

  return (
    <div>
      <Header />
      {areas && (
        <select
          onClick={ handleSelectFilter }
          data-testid="explore-by-area-dropdown"
        >
          <option selected data-testid="All-option">
            All
          </option>
          {areas.map((area, index) => (
            <option data-testid={ `${area.strArea}-option` } key={ index }>
              {area.strArea}
            </option>
          ))}
        </select>
      )}
      <div className="explore-cards">{printRecipes()}</div>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
