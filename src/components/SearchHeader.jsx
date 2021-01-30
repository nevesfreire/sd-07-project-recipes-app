import React from 'react';
import { SearchHeaderStyle } from './style';

const {
  Container,
  SearchBar,
  RadioBtnsContainer,
  SearchBtn,
} = SearchHeaderStyle;

function SearchHeader() {
  return (
    <form>
      <Container>
        <SearchBar
          name="input"
          placeholder="Buscar receita"
          type="text"
          data-testid="search-input"
          // onChange={}
        />
        <div>
          <SearchBtn
            type="button"
            data-testid="exec-search-btn"
          >
            Buscar
          </SearchBtn>
        </div>
      </Container>
      <RadioBtnsContainer>
        <label htmlFor="ingredients">
          <input
            name="input"
            value="ingredients"
            id="ingredients"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          Ingredientes
        </label>

        <label htmlFor="name">
          <input
            name="input"
            value="name"
            id="name"
            type="radio"
            data-testid="name-search-radio"
          />
          Nome
        </label>

        <label htmlFor="first-letter">
          <input
            name="input"
            value="first-letter"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </RadioBtnsContainer>
    </form>
  );
}

export default SearchHeader;
