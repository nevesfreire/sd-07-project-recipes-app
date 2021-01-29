import React, { useContext } from 'react';
import { Header, Footer, RandonCards, Cards } from '../components';
import { CupNodesContext } from '../contexts';

export default function Home() {
  const { filterDates: { category } } = useContext(CupNodesContext);
  return (
    <div>
      <Header title="Comidas" />
      {
        category.length
          ? <Cards number={ 5 } category={ category } />
          : <RandonCards number={ 5 } food={ false } />
      }
      <Footer />
    </div>
  );
}
