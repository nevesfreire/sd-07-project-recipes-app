import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Perfil from '../components/Perfil';

function Profile() {
  return (
    <div>
      <Header title="Perfil" isSearchable={ false } />
      <Perfil />
      <Footer />
    </div>
  );
}
export default Profile;
