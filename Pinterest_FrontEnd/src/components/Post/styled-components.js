import styled from "styled-components";
import { device } from "../../styles/device";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90%;
  margin-top: 5px;

  @media ${device.tablet} {
  } ;
`;

const FormWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media ${device.tablet} {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
  } ;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 15px;

  @media ${device.tablet} {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
  } ;
`;

export { FormWrapper, ImgWrapper, ContentContainer };
