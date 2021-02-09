import { thayProfile,
  wolfProfile,
  hamajiProfile,
  estrogonof,
  pizza,
  hamburguer,
  hidromel,
  fancyDrink,
  sakerinha,
} from '../images';

const data = {
  thay: {
    video: {
      titleVideo: 'Quem é a Pabllo perto do fenômeno Thay?!',
      linkVideo: 'https://www.youtube.com/watch?v=QcS9ZndErHc',
    },
    drink: {
      drinkTitle: 'Fancy Drink',
      drinkImg: fancyDrink,
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
      titleVideo: 'Samurai + Forró = Hamaji',
      linkVideo: 'https://www.youtube.com/watch?v=1u88nWht-cg',
    },
    drink: {
      drinkTitle: 'Caipirinha de Saquê',
      drinkImg: sakerinha,
    },
    food: {
      foodTitle: 'Pizza',
      foodImg: pizza,
    },
    img: { picture: hamajiProfile },
    text: {
      title: 'Obrigado',
      text: 'Obrigado pelas aulas, pelos ensinamentos e pela dedicação.',
    },
  },
  wolf: {
    video: {
      titleVideo: 'Musica para curtir em quanto come',
      linkVideo: 'https://www.youtube.com/watch?v=v2AC41dglnM',
    },
    drink: {
      drinkTitle: 'Hidromel',
      drinkImg: hidromel,
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
