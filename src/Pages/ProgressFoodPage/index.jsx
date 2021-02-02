import React from 'react';
import { useParams } from 'react-router';
import '../../App.css';
import ProgressScreen from '../../Components/ProgressScreen';

const ProgressFood = () => {
  const { idreceita } = useParams();
  return (
    <div className="container-over">
      <div className="container-int">
        {/* <Header title="Progresso da comida" /> */}
        <ProgressScreen idReceita={ idreceita } />
      </div>
    </div>
  );
};

export default ProgressFood;
