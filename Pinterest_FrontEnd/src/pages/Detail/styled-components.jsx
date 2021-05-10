import styled from "styled-components";

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  margin: 0 auto;
`;

const GoBack = styled.button`
  z-index: 4;
  width: 60px;
  max-width: 265px;
  top: 100px;
  position: fixed;
  left: 40px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ImageDetail = styled.img`
  display: flex;
  max-width: 400px;
  max-height: 400px;
  align-items: center;
  margin-right: 40px;
`;

const ImageContainer = styled.div`
  max-width: 1200px;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export { DetailWrapper, ImageContainer, ImageDetail, GoBack };