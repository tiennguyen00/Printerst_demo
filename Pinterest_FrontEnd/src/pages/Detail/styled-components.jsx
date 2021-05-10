import styled from "styled-components";

const DetailWrapper = styled.div`
  height: 100%;
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  margin: auto;
  padding-top: 30px;
`;

const ImageDetail = styled.img`
  display: flex;
  max-width: 420px;
  max-height: 420px;
  align-items: center;
`;

const ImageInformation = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
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
