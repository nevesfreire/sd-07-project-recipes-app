// créditos das fotos:
// drinks: Chuttersnap - https://unsplash.com/@chuttersnap
// foods: Asiya Kiev - https://unsplash.com/@saileyas
import styled from 'styled-components';

const Styles = {
  BtnBar: styled.div`
  align-items: center;
  background-image: 
  url('/categoryImage/${({ id }) => id}.jpg');
  background-size: 100%;
  background-attachment: fixed;
  box-shadow:inset 0 0 0 2000px rgba(255, 0, 150, 0.2);
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  justify-content: center;
  margin-bottom: 0.5rem;
  width: 100vw;
`,
};

export default Styles;
