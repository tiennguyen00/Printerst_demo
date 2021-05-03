import styled from "styled-components";

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  width: 100%;
`;

const ImageDetail = styled.img`
  display: flex;
  max-width: 400px;
  max-height: 400px;
  align-items: center;
  margin-right: 40px;
`;

const ImageInformation = styled.div``;

const ImageContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export { DetailWrapper, ImageContainer, ImageDetail, ImageInformation };
