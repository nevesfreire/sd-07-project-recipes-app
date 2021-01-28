import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const {
    searching,
  } = useContext(RecipesContext);

  if (searching) {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">

          <Form.Control
            type="text"
            data-testid="search-input"
            placeholder="Buscar Receita"
            name="search"
            // onChange={ (e) => setEmail(e.target.value) }
          />
        </Form.Group>

        <div key="inline-radio" className="mb-3">
          <Form.Check
            inline
            label="Ingrediente"
            data-testid="ingredient-search-radio"
            type="radio"
            id="inline-radio-ingrediente"
          />
          <Form.Check
            inline
            label="Nome"
            data-testid="name-search-radio"
            type="radio"
            id="inline-radio-nome"
          />
          <Form.Check
            inline
            label="Primeira letra"
            data-testid="first-letter-search-radio"
            type="radio"
            id="inline-radio-primeira-letra"
          />
        </div>

        <Link to="/">
          <Button
            type="button"
            data-testid="exec-search-btn"
            // disabled={ isDisabled() }
            // onClick={ handleEntrarButton }
            variant="secondary"
          >
            Buscar
          </Button>
        </Link>
      </Form>
    );
  }
  return null;
}

export default SearchBar;
