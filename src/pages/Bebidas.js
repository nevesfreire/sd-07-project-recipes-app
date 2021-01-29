import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchButton from '../components/SearchButton';

export default function Bebidas() {
  return (
    <div>
      <Header />
      <SearchButton />
      <SearchBar />
      <Footer />
    </div>
  );
}
