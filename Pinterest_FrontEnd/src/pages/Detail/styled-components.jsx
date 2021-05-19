import styled from "styled-components";

const DetailWrapper = styled.div`
  width: 1016px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  margin: auto;
  padding-top: 110px;
`;

const ImageDetail = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
  }
`;

const ImageInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  h4 {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 20px;
  background-color: white;
`;

export { DetailWrapper, ImageContainer, ImageDetail, ImageInformation };
