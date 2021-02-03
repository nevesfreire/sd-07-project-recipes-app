import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import App from './App';
import fetch from '../cypress/mocks/fetch';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetch(url),
  )
}

describe('Tela de Login', () => {
  test('Existe campo para email', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId("email-input");
    expect(email).toBeInTheDocument();
  });

  test('Existe campo para senha', () => {
    const { getByTestId } = render(<App />);
    const senha = getByTestId("password-input");
    expect(senha).toBeInTheDocument();
  });

  test('Existe botão entrar e está desabilitado', () => {
    const { getByTestId } = render(<App />);
    const botao = getByTestId("login-submit-btn");
    expect(botao).toBeInTheDocument();
    expect(botao).toHaveAttribute('disabled');
  });

  test('Se o botão habilita quando preencher os campos', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId("email-input");
    const senha = getByTestId("password-input");
    const botao = getByTestId("login-submit-btn");
    fireEvent.change(email, { target: { value: 'teste@teste.com' } })
    fireEvent.change(senha, { target: { value: '1234567' } })
    expect(botao).not.toHaveAttribute('disabled');

    fireEvent.change(email, { target: { value: 'teste@teste.com' } })
    fireEvent.change(senha, { target: { value: '123456' } })
    expect(botao).toHaveAttribute('disabled');

    fireEvent.change(email, { target: { value: 'testeteste.com' } })
    fireEvent.change(senha, { target: { value: '1234567' } })
    expect(botao).toHaveAttribute('disabled');
  })

  test('Se a rota muda ao clicar no botão', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId("email-input");
    const senha = getByTestId("password-input");
    const botao = getByTestId("login-submit-btn");
    fireEvent.change(email, { target: { value: 'teste@teste.com' } });
    fireEvent.change(senha, { target: { value: '1234567' } });
    expect(botao).not.toHaveAttribute('disabled');

    fireEvent.click(botao);
    expect(global.window.location.pathname).toEqual('/comidas');
  })
})

describe('Tela de Principal Comidas', () => {
  beforeEach(cleanup);
  beforeAll(mockFetch)

  test('Os icones e título do header', () => {
    const { getByTestId } = render(<App />);
    const userIcon = getByTestId("profile-top-btn");
    const findIcon = getByTestId("search-top-btn");
    const title = getByTestId("page-title");
    expect(userIcon).toBeInTheDocument();
    expect(findIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  })

  test('Cards existem', async () => {
    await act(async () => {
      render(<App />);
    })
    expect(await screen.getByTestId('0-recipe-card')).toBeInTheDocument();
  })

  test('Muda para detalhes da receita se houver 1 resultado', async () => {
    await act(async () => {
      render(<App />);
    })
    const findIcon = screen.getByTestId("search-top-btn");
    expect(findIcon).toBeInTheDocument();
    fireEvent.click(findIcon);

    const nameRadio = screen.getByTestId("name-search-radio");
    expect(nameRadio).toBeInTheDocument();
    fireEvent.click(nameRadio);
    expect(nameRadio.value).toBe("name");

    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Arrabiata' } });

    const button = screen.getByText("Buscar");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // mockFetch();
    // expect(await global.window.location.pathname).toEqual('/comidas/52771');
    expect(await screen.getByTestId('recipe-title')).toBeInTheDocument()
  })

  test('Clicar no card', async () => {
    const history = createMemoryHistory();

    await act(async () => {
      render(
      <Router history={history}>
        <App />
      </Router>)
    })
    history.push("/comidas");
    const card = screen.getByTestId("0-recipe-card");
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    expect(await global.window.location.pathname).toEqual('/comidas/52977');
  })
})
