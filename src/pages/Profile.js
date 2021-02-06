import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Perfil from '../components/Perfil';
import '../styles/Perfil.css';

function Profile() {
  return (
    <div className="container-perfil">
      <Header title="Perfil" isSearchable={ false } />
      <Perfil />
      <Footer />
    </div>
  );
}
export default Profile;
