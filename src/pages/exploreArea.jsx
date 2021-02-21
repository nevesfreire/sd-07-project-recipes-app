import React from 'react';
import ExploreAreaBtns from '../components/ExploreAreaBtns';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListCards from '../components/ListCards';

export default function ExploreArea() {
  return (
    <div className="profile-main">
      <Header />
      <ExploreAreaBtns />
      <ListCards />
      <Footer />
    </div>
  );
}
