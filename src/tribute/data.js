import { thayProfile,
  wolfProfile,
  hamajiProfile,
  estrogonof,
  pizza,
  hamburguer,
} from '../images';

const data = {
  thay: {
    video: {
      titleVideo: 'A Pabllo que se',
      linkVideo: 'https://www.youtube.com/watch?v=QcS9ZndErHc',
    },
    drink: {
      drinkTitle: '',
      drinkImg: 'Coca-cola',
    },
    food: {
      foodTitle: 'Hamburguer',
      foodImg: hamburguer,
    },
    img: { picture: thayProfile },
    text: { title: 'Obrigado', text: 'Obrigado pelos plantões, pela gentileza, pela empatia e por sempre deixar nossos dias muito mais musicais!' },
  },
  hamaji: {
    video: {
      titleVideo: 'Goku + Forró',
      linkVideo: 'https://www.youtube.com/watch?v=urv7eHp1Ivo',
    },
    drink: {
      drinkTitle: 'Para beber',
      drinkImg: 'Coca-cola',
    },
    food: {
      foodTitle: 'Pizza',
      foodImg: pizza,
    },
    img: { picture: hamajiProfile },
    text: { title: 'Obrigado', text: 'Obrigado pelas aulas, pelos ensinamentos e pela dedicação.' },
  },
  wolf: {
    video: {
      titleVideo: 'Musica para curtir em quanto come',
      linkVideo: 'https://www.youtube.com/watch?v=QcS9ZndErHc',
    },
    drink: {
      drinkTitle: '',
      drinkImg: 'Coca-cola',
    },
    food: {
      foodTitle: 'Strogonoff de Frango com batata palha',
      foodImg: estrogonof,
    },
    img: { picture: wolfProfile },
    text: { title: 'Obrigado', text: 'Obrigado pelos plantões, pelas dicas e por tua atenção aos detalhes.' },
  },
};

export default data;
