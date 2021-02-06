import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../../context';
import { Card, Filters, Footer, Header } from '../../components';
import RequestData from '../../services/RequestAPI';
import './style.css';

function MainPage(props) {
  const { location } = props;
  const { pathname } = location;

  const {
    data,
    filters,
    isMeal,
    activeFilter,
    setData,
    setFilters,
    setIsMeal,
    explorer,
    setExplorer,
  } = useContext(context);

  useEffect(() => {
    async function fetchData() {
      const recipeType = (pathname === '/comidas') ? 'meal' : 'cocktail';
      const URL_FILTERS = `https://www.the${recipeType}db.com/api/json/v1/1/list.php?c=list`;
      const dataFilters = await RequestData(URL_FILTERS);
      if (pathname === '/comidas') {
        await setFilters(dataFilters.meals);
      } else {
        await setFilters(dataFilters.drinks);
      }
    }
    fetchData();
  });

  useEffect(() => {
    let URL = '';
    async function fetchData() {
      await setData([]);
      let dataRequest = [];
      if (pathname === '/comidas') {
        setIsMeal(true);
        const { meals } = await RequestData(URL);
        dataRequest = meals;
      } else {
        setIsMeal(false);
        const { drinks } = await RequestData(URL);
        dataRequest = drinks;
      }
      await setData(dataRequest);
    }
    if (pathname === '/comidas') {
      setIsMeal(true);
    } else {
      setIsMeal(false);
    }
    if (explorer) {
      // console.log('moacyr');
      const recipeType = (pathname === '/comidas') ? 'meal' : 'cocktail';

      if (activeFilter) {
        URL = `https://www.the${recipeType}db.com/api/json/v1/1/filter.php?c=${activeFilter}`;
      } else {
        URL = `https://www.the${recipeType}db.com/api/json/v1/1/search.php?s=`;
      }
      fetchData();
    } else {
      // if (pathname === '/comidas') {
      //   setIsMeal(true);
      // } else {
      //   setIsMeal(false);
      // }
      setExplorer(true);
      // console.log('disjuntor caindo');
    }
  }, [setData, setIsMeal, activeFilter, pathname]);

  const cardsPerPage = 12;

  function printFilters() {
    if (filters === undefined) return (<span>Nenhum filtro encontrado</span>);
    if (!filters.length) return (<span>Carregando os filtros</span>);
    return (<Filters filters={ filters } />);
  }

  function printRecipes() {
    if (data === undefined) return (<span>Nenhuma receita encontrada</span>);
    if (!data.length) return (<span>Carregando as receitas</span>);
    const zero = 0;
    return (
      data.slice(zero, cardsPerPage).map((item, index) => (
      // {console.log(isMeal, item.strMeal)}
        <Card
          key={ index }
          index={ index }
          id={ (isMeal) ? item.idMeal : item.idDrink }
          name={ (isMeal) ? item.strMeal : item.strDrink }
          thumb={ (isMeal) ? item.strMealThumb : item.strDrinkThumb }
          recipeType={ (isMeal) ? 'comidas' : 'bebidas' }
          testIdCard={ `${index}-recipe-card` }
          testIdThumb={ `${index}-card-img` }
          testIdTitle={ `${index}-card-name` }
        />
      ))
    );
  }

  return (
    <div>
      <Header />
      <div className="main-page-container">
        <div className="main-page-content">
          {
            printFilters()
          }
          <div className="main-page-cards">
            {
              printRecipes()
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

MainPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MainPage;
