import React from 'react';
import { useParams } from 'react-router';
import '../../App.css';
import ProgressScreen from '../../Components/ProgressScreen';

const ProgresDrink = () => {
  const { idreceita } = useParams();
  return (
    <div className="container-over">
      <div className="container-int">
        {/* <Header title="Progresso Bebidas" /> */}
        <ProgressScreen idReceita={ idreceita } />
      </div>
    </div>
  );
};

export default ProgresDrink;
