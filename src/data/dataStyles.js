const randomBG = () => {
  const ten = 10;
  const randomNumber = (Math.random() * ten).toFixed();
  return `linear-gradient(-135deg, rgba(81,201,105,0.06) 50%, 
  rgba(121,14,14,0.2)), url('/bgImage/${randomNumber}.jpg')`;
};

const styledComponents = {
  styles: {
    loginBG: randomBG(),
    colorTheme: {
      main: '#0fa36b',
    },
    logo: {
      width: '100%',
      colors: {
        background: '#054',
        spoon: '#f2f2f2',
        text: '#c83737',
      },
      borderRadius: '50%',
      animation: true,
    },
  },
};

export default styledComponents;
