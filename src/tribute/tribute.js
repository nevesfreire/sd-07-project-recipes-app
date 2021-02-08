import React from 'react';
import data from './data';
import './tribute.css';
import { UperCaseFirstLetter } from '../Services';

export default function tribute({ match: { params: { name } } }) {
  const {
    video: { titleVideo, linkVideo },
    drink: { drinkTitle, drinkImg },
    food: { foodTitle, foodImg },
    img: { picture },
    text: { title, text },
  } = data[name];
  return (
    <div className="containerTribute">

      <header className="headerTribute">
        <h1>{UperCaseFirstLetter(name)}</h1>
        <img src={ picture } alt="foto de perfil" />
      </header>

      <div className="cardFood">
        <h2>{foodTitle}</h2>
        <img src={ foodImg } alt="imagem" />
      </div>

      <div className="cardDrink">
        <h2>{drinkTitle}</h2>
        <img src={ drinkImg } alt="imagem" />
      </div>

      <div className="texto">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>

      <div className="containerVideo">
        <h2>{titleVideo}</h2>
        <iframe
          title="Uma boa musica"
          src={ linkVideo.replace('watch?v=', 'embed/') }
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
