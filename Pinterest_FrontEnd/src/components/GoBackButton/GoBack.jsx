import styled from "styled-components";
import { device } from "../../styles/device";

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
  @media ${device.mobileS} {
  }
  @media ${device.mobileM} {
  }
  @media ${device.mobileL} {
    z-index: 4;
    width: 60px;
    max-width: 265px;
    top: 100px;
    position: fixed;
    left: 20px;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }
`;

export { GoBack };
