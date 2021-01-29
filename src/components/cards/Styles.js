import styled from 'styled-components';

const Styles = {
  Content: styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px rgba(178,179,182,1);
  display: flex;
  margin: 0.2rem;
  padding: 1rem;
  width: 80vw;
`,
  NameContainer: styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`,
  Name: styled.span`
  font-size: 2em;
`,
  Image: styled.img`
  border-radius: 1rem;
  width: 40%;
`,
};

export default Styles;
