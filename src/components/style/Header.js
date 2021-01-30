import styled from 'styled-components';

const HeaderStyle = {
  Container: styled.header`
    align-items: center;
    background-color: ${(p) => p.bgColor};
    display: flex;
    flex-direction: column;
    height: auto;
    padding-bottom: 2%;
    width: 100vw;
  `,
  InfoDisplay: styled.div`
    align-items: center;
    display: flex;
    justify-content: space-around;
    height: 8vh;
    width: 60%;
    `,
  Btn: styled.button`
    background: none;
    border: none;
    :focus {
      outline: none;
    }
    `,
  SearchContainer: styled.div`
    align-items: flex-start;
    display: flex;
    justify-content: center;
    width: 60vw;
  `,
  SearchIcon: styled.img`
    transition: 5s;
  `,
};

export default HeaderStyle;
