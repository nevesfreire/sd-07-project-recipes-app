import React from 'react';
import { render } from '@testing-library/react';
import CardRecomendacaoComida from '../components/card/CardRecomendacaoComida';
import CardRecomendacaoBebida from '../components/card/CardRecomendacaoBebida';

describe('Testando arquivo CardRecomendacaoComida.js', () => {
  test('Conteúdo da página CardRecomendacaoComida.js', () => {
    const { getByText } = render(<CardRecomendacaoComida />);
    const nomeDaPagina = getByText('Card Recomendação Comida');
    expect(nomeDaPagina).toBeInTheDocument();
  });

  test('Conteúdo da página CardRecomendacaoBebida.js', () => {
    const { getByText } = render(<CardRecomendacaoBebida />);
    const nomeDaPagina = getByText('Card Recomendação Bebida');
    expect(nomeDaPagina).toBeInTheDocument();
  });
});
