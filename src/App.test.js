// import React from 'react';
// import { createBrowserHistory } from 'history';
// import { Router } from 'react-router-dom';
// import { render, fireEvent, screen, cleanup } from '@testing-library/react';
// import App from './App';
// import fetch from '../cypress/mocks/fetch';

// const renderPath = (path) => {
//   const history = createBrowserHistory()
//   history.push(path);
//   const { ...resources } = render(
//     <Router history={history}>
//       <App />
//     </Router>
//   )
//   return { ...resources, history }
// }

// const mockFetch = () => {
//   jest.spyOn(global, 'fetch')
//     .mockImplementation((url) => fetch(url))
// };

// describe('Tela de Login', () => {
//   test('Existe campo para email, senha e botao', () => {
//     renderPath("/");
//     const email = screen.getByTestId("email-input");
//     const senha = screen.getByTestId("password-input");
//     const botao = screen.getByTestId("login-submit-btn");
//     expect(email).toBeInTheDocument();
//     expect(senha).toBeInTheDocument();
//     expect(botao).toBeInTheDocument();
//   });
//   test('Se o botão habilita quando preencher os campos', () => {
//     renderPath("/");
//     const email = screen.getByTestId("email-input");
//     const senha = screen.getByTestId("password-input");
//     const button = screen.getByTestId("login-submit-btn");
//     expect(button).toBeDisabled();

//     fireEvent.change(email, { target: { value: 'email' } });
//     fireEvent.change(senha, { target: { value: '1234567' } });
//     expect(button).toBeDisabled();

//     fireEvent.change(email, { target: { value: 'email@com@' } });
//     fireEvent.change(senha, { target: { value: '1234567' } });
//     expect(button).toBeDisabled();

//     fireEvent.change(email, { target: { value: 'emailcom@' } });
//     fireEvent.change(senha, { target: { value: '1234567' } });
//     expect(button).toBeDisabled();

//     fireEvent.change(email, { target: { value: 'alguem@email.com' } });
//     fireEvent.change(senha, { target: { value: '23456' } });
//     expect(button).toBeDisabled();

//     fireEvent.change(email, { target: { value: 'alguem@email.' } });
//     fireEvent.change(senha, { target: { value: '1234567' } });
//     expect(button).toBeDisabled();

//     fireEvent.change(email, { target: { value: 'alguem@email.com' } });
//     fireEvent.change(senha, { target: { value: '1234567' } });
//     expect(button).toBeEnabled();
//   });
//   test('Se a rota muda ao clicar no botão', () => {
//     const { history } = renderPath("/");
//     const email = screen.getByTestId("email-input");
//     const senha = screen.getByTestId("password-input");
//     const botao = screen.getByTestId("login-submit-btn");
//     fireEvent.change(email, { target: { value: 'teste@teste.com' } });
//     fireEvent.change(senha, { target: { value: '1234567' } });
//     fireEvent.click(botao);
//     const { pathname } = history.location;
//     expect(pathname).toEqual('/comidas');
//   });
// });

// describe('renderizando telas', () => {
//   test('DetalhesBebidas', () => {
//     renderPath("/bebidas/178319");
//     fireEvent.click( screen.getByTestId("favorite-btn"));
//     fireEvent.click( screen.getByTestId("start-recipe-btn"));
//   })
//   test('DetalhesBebidas', () => {
//     renderPath("/bebidas/178319");
//   })     
//   test('ExplorarBebidas', () => {
//     renderPath("/explorar/bebidas");
//     fireEvent.click( screen.getByTestId("explore-by-ingredient"));
//   });
//   test('ExplorarBebidas', () => {
//     renderPath("/explorar/bebidas");
//     fireEvent.click( screen.getByTestId("explore-by-area"));
//   });
//   test('ExplorarBebidas', () => {
//     renderPath("/explorar/bebidas");
//     fireEvent.click( screen.getByTestId("explore-surprise"));
//   });
//   test('IngredientsBebidas', () => {
//     renderPath("/explorar/bebidas/ingredientes");

//   })
//   test('PrincipalBebidas', () => {
//     const { history } = renderPath("/bebidas");
//     fireEvent.click( screen.getByTestId("profile-top-btn"));
//   })
//   test('PrincipalBebidas', async () => {
//   renderPath("/bebidas");
//     fireEvent.click( await screen.getByTestId("Ordinary Drink-category-filter"));
//     fireEvent.click( await screen.getByTestId("Cocktail-category-filter"));
//     fireEvent.click( await screen.getByTestId("Milk \/ Float \/ Shake-category-filter"));
//     fireEvent.click( await screen.getByTestId("Other\/Unknown-category-filter"));
//     fireEvent.click( await screen.getByTestId("Cocoa-category-filter"));
//     fireEvent.click( screen.getByTestId("All-category-filter"));
//   })
//   test('ProcessoBebidas', () => {
//     renderPath("/bebidas/178319/in-progress");

//   })
//   test('DetalhesComidas', () => {
//     renderPath("/comidas/52771");
//     fireEvent.click( screen.getByTestId("favorite-btn"));
//     fireEvent.click( screen.getByTestId("start-recipe-btn"));
//   })
//   test('DetalhesComidas', () => {
//     renderPath("/comidas/52771");
//   })
//   test('ExplorarComidas', () => {
//     renderPath("/explorar/comidas");
//     fireEvent.click( screen.getByTestId("explore-by-ingredient"));
//   })
//   test('ExplorarComidas', () => {
//     renderPath("/explorar/comidas");
//     fireEvent.click( screen.getByTestId("explore-by-area"));
//   })
//   test('ExplorarComidas', () => {
//     renderPath("/explorar/comidas");
//     fireEvent.click( screen.getByTestId("explore-surprise"));
//   })
//   test('IngredientsComidas', () => {
//     renderPath("/explorar/comidas/ingredientes");

//   })
//   test('PrincipalComidas', () => {
//     renderPath("/comidas");
//     fireEvent.click( screen.getByTestId("search-top-btn"));
//     fireEvent.click( screen.getByTestId("first-letter-search-radio"));
//     fireEvent.change( screen.getAllByTestId("search-input"), { target: { value: 'a' } });
//     fireEvent.click( screen.getByTestId("exec-search-btn"));
//   })
//   test('PrincipalComidas', () => {
//     renderPath("/comidas");
//     fireEvent.click( screen.getByTestId("search-top-btn"));
//     fireEvent.click( screen.getByTestId("ingredient-search-radio"));
//     fireEvent.click( screen.getByTestId("first-letter-search-radio"));
//     fireEvent.change(screen.getAllByTestId("search-input"), { target: { value: 'carambolas' } });
//     fireEvent.click( screen.getByTestId("exec-search-btn"));
//   })
//   test('PrincipalComidas', () => {
//     renderPath("/comidas");
//     fireEvent.click( screen.getByTestId("search-top-btn"));
//     fireEvent.click( screen.getByTestId("name-search-radio"));
//     fireEvent.change(screen.getAllByTestId("search-input"), { target: { value: 'pizza' } });
//     fireEvent.click( screen.getByTestId("exec-search-btn"));
//   })
//   test('PrincipalComidas', () => {
//     renderPath("/comidas");
//     fireEvent.click( screen.getByTestId("explore-bottom-btn"));
//   })
//   test('ProcessoComidas', () => {
//     renderPath("/comidas/52771/in-progress");
//     fireEvent.click( screen.getByTestId("explore-bottom-btn"));
//   })
//   test('Explorar', () => {
//     renderPath("/explorar");
//     fireEvent.click( screen.getByTestId("drinks-bottom-btn"));
//   })
//   test('Explorar', () => {
//     renderPath("/explorar");
//     fireEvent.click( screen.getByTestId("food-bottom-btn"));
//   })
//   test('Explorar', () => {
//     renderPath("/explorar");
//     fireEvent.click( screen.getByTestId("explore-food"));
//   })
//   test('Explorar', () => {
//     renderPath("/explorar");
//     fireEvent.click( screen.getByTestId("explore-drinks"));
//   })
//   test('Favoritas', () => {
//     renderPath("/receitas-favoritas");

//   })
//   test('Feitas', () => {
//     renderPath("/receitas-feitas");
//   })
//   test('Origem', () => {
//     renderPath("/explorar/comidas/area");

//   })
//   test('Perfil', () => {
//     renderPath("/perfil");
//     fireEvent.click( screen.getByTestId("profile-done-btn"));
//   })
//   test('Perfil', () => {
//     renderPath("/perfil");
//     fireEvent.click( screen.getByTestId("profile-favorite-btn"));
//   })
//   test('Perfil', () => {
//     renderPath("/perfil");
//     fireEvent.click( screen.getByTestId("profile-logout-btn"));
//   })
//   test('NotFound', () => {
//     renderPath("/aloo");

//   })
// });
// sem brecha...
