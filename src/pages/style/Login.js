import styled from 'styled-components';

const ten = 10;
const getBG = () => {
  const randomNum = (Math.random() * ten).toFixed();
  const imgPath = `/bgImage/${randomNum}.jpg`;
  const gradient = '-135deg, rgba(81, 201, 105, 0.06) 50%, rgba(121, 14, 14, 0.2)';
  return (
    `linear-gradient(${gradient}) , url(${imgPath})`
  );
};

const LoginStyle = {
  Container: styled.div`align-items: center;
  background-image: ${getBG()};
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
`,

  LogoContainer: styled.div`justify-content: center;
  opacity: 0.8;
  width: 50vw;
`,

  Form: styled.form`align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
`,

  PassContainer: styled.div`display: flex;
`,

  Input: styled.input`align-items: center;
  border: none;
  border-radius: ${({ id }) => (id === 'email' ? '2rem' : '2rem 0 0 2rem')};
  display: flex;
  font-size: 1em;
  height: 6vh;
  justify-content: center;
  margin-top: 1vh;
  text-align: center;
  width: ${({ id }) => (id === 'email' ? '90%' : '70%')};

  :focus {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.46);
    outline: none;
  }
`,

  Btn: styled.button`background: white;
  border: none;
  border-radius: 0 2rem 2rem 0;
  font-size: 1em;
  font-weight: 600;
  height: 85%;
  margin-top: 1vh;
  width: 30%;

  :focus {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.46);
    outline: none;
  }
`,
};

export default LoginStyle;
