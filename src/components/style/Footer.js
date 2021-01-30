import styled from 'styled-components';

const FooterStyle = {
  Container: styled.div`
  align-items: center;
  background-color: ${(p) => p.bgColor};
  bottom: 0;
  display: flex;
  height: 10vh;
  justify-content: space-around;
  position: fixed;
  width: 100vw;
`,
};

export default FooterStyle;
