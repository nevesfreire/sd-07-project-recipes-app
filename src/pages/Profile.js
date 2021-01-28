import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Perfil'));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Profile;
