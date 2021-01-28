import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TitleContext = createContext();

export const titleHeaderNames = [{
  comidas: {
    route: '/comidas',
    title: 'Comidas',
  },
  bebidas: {
    route: '/bebidas',
    title: 'Bebidas',
  },
  perfil: {
    route: '/perfil',
    title: 'Perfil',
  },
  explorar: {
    route: '/explorar',
    title: 'Explorar',
  },
  explorarcomidas: {
    route: '/explorar/comidas',
    title: 'Explorar Comidas',
  },
  explorarbebidas: {
    route: '/explorar/bebidas',
    title: 'Explorar Bebidas',
  },
  explorarcomidasingredientes: {
    route: '/explorar/comidas/ingredientes',
    title: 'Explorar Ingredientes',
  },
  explorarbebidasingredientes: {
    route: '/explorar/bebidas/ingredientes',
    title: 'Explorar Ingredientes',
  },
  explorarcomidasarea: {
    route: '/explorar/comidas/area',
    title: 'Explorar Origem',
  },
  receitasfeitas: {
    route: '/receitas-feitas',
    title: 'Receitas Feitas',
  },
  receitasfavoritas: {
    route: '/receitas-favoritas',
    title: 'Receitas Favoritas',
  },
}];

export default function TitleHeaderProvider({ children }) {
  const [titleHeaderName, setHeaderName] = useState(titleHeaderNames[0].comidas);
  return (
    <TitleContext.Provider value={ { titleHeaderName, setHeaderName } }>
      {children}
    </TitleContext.Provider>
  );
}

export function useTitleContext() {
  const context = useContext(TitleContext);
  const { titleHeaderName, setHeaderName } = context;
  return { titleHeaderName, setHeaderName };
}

TitleHeaderProvider.propTypes = { children: PropTypes.element.isRequired };
