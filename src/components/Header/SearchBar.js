import React, { useState, useContext } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';
import { searchIcon } from '../../images';

export default function SearchBar() {
  const [filterType, setFilterType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [dropdownTitle, setDropTitle] = useState('Filtro');
  const { fetchMeals, fetchDrinks } = useContext(RecipesContext);

  const searchMeals = async () => {
    const meal = await fetchMeals(filterType, searchInput, true);
    if (!meal) return null;
    const id = meal.result.meals[0].idMeal;
    if (meal.redirect) return window.location.replace(`/comidas/${id}`);
  };

  const searchDrinks = async () => {
    const drink = await fetchDrinks(filterType, searchInput, true);
    if (!drink) return null;
    const id = drink.result.drinks[0].idDrink;
    if (drink.redirect) return window.location.replace(`/bebidas/${id}`);
  };

  const { pathname } = useLocation();

  const handleSearch = () => {
    if (filterType === 'firstLetter' && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (pathname === '/comidas' || pathname === '/explorar/comidas/area') {
      searchMeals();
    } else if (pathname === '/bebidas') {
      searchDrinks();
    }
  };

  const doSearch = () => {
    if (filterType && searchInput) {
      handleSearch();
    } else {
      alert('Preencha o campo de busca e de filtro!');
    }
  };

  return (
    <div>
      <InputGroup id="search-group">
        <InputGroup.Append>
          <FormControl
            value={ searchInput }
            onChange={ ({ target }) => setSearchInput(target.value) }
          />
          <DropdownButton
            as={ InputGroup.Append }
            id="btn-dropdown"
            variant="secondary"
            title={ dropdownTitle }
          >
            <Dropdown.Header>Filtrar por:</Dropdown.Header>
            <Dropdown.Item
              eventKey="1"
              onClick={ () => {
                setFilterType('ingredient');
                setDropTitle('Ingrediente');
              } }
            >
              Ingrediente
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={ () => {
                setFilterType('name');
                setDropTitle('Nome');
              } }
            >
              Nome
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              onClick={ () => {
                setFilterType('firstLetter');
                setDropTitle('Primeira Letra');
              } }
            >
              Primeira Letra
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup.Append>
        <Button
          data-testid="exec-search-btn"
          id="btn-search"
          onClick={ () => doSearch() }
          variant="secondary"
        >
          <img alt="Search Button" src={ searchIcon } width="21" />
        </Button>
      </InputGroup>
    </div>
  );
}
