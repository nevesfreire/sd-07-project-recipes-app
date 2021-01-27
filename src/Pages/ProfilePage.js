import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Profile from '../Components/Profile';

function ProfilePage() {
  return (
    <div>
      <Header title="Perfil" />
      <Profile />
      <Footer />
    </div>
  );
}

export default ProfilePage;
