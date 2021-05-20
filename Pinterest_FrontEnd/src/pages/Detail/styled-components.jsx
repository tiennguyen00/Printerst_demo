import styled from "styled-components";
import { device } from "../../styles/device";

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

  @media ${device.mobileS} {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 140px;
  }

  @media ${device.mobileM} {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.mobileL} {
    width: 80%;
    padding-top: 140px;
    height: 100%;
  }

  @media ${device.tablet} {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.laptop} {
    width: 1016px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.laptopL} {
    width: 1016px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.desktop} {
    width: 1016px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 20px;
  background-color: white;

  @media ${device.mobileS} {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 140px;
  }

  @media ${device.mobileM} {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.mobileL} {
    width: 100%;
    height: 100%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
    border-radius: 20px;
    background-color: white;
  }

  @media ${device.tablet} {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.laptop} {
    width: 1016px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.laptopL} {
    width: 1016px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }

  @media ${device.desktop} {
    width: 1016px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: auto;
    padding-top: 110px;
  }
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

  @media ${device.mobileL} {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 300px;
      height: 300px;
      object-fit: contain;
    }
  }
`;

const ImageInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 10px;

  h4 {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 18px;
      width: fit-content;
    }

    h4 {
      width: fit-content;
      font-size: 14px;
      display: flex;
      align-items: center;
      flex-direction: row;
    }
  }
`;

export { DetailWrapper, ImageContainer, ImageDetail, ImageInformation };
