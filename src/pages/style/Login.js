// créditos das fotos: Dilyara Garifullina - https://unsplash.com/@dilja96
import styled from 'styled-components';

const randomBg = () => {
  const ten = 10;
  const randomNumber = (Math.random() * ten).toFixed();
  return `/backgroundImages/${randomNumber}.jpg`;
};

randomBg();

const Styles = {
  LoginContainer: styled.div`
  align-items: center;
  background-image: 
    linear-gradient(
    -135deg,
    rgba(81,201,105,0.06) 50%,
    rgba(121,14,14,0.2)
  ),
    url(${randomBg()}
  );
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
`,
  LogoContainer: styled.div`
  justify-content: center;
  opacity: 0.8;
  width: 50vw;
`,
  Form: styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
  `,
  PassContainer: styled.div`
  display: flex;
  `,
  Input: styled.input`
  align-items: center;
  border: none;
  border-radius: ${({ id }) => (id === 'password' ? '2rem 0 0 2rem' : '2rem')};
  display: flex;
  justify-content: center;
  height: 6vh;
  font-size: 1em;
  text-align: center;
  margin-top: 1vh;
  width: ${({ id }) => (id === 'password' ? '70%' : '85%')};
  :focus {
    box-shadow: 0 1px 4px rgba(0,0,0,0.46);
    outline: none;
  }
  `,
  Btn: styled.button`
  background: white;
  border: none;
  border-radius: 0 2rem 2rem 0;
  font-size: 1em;
  font-weight: 600;
  height: 85%;
  margin-top: 1vh;
  width: 30%;
  :focus {
    box-shadow: 0 1px 4px rgba(0,0,0,0.46);
    outline: none;
  }
  `,
};

export default Styles;
