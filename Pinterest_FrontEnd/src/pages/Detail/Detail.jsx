import React from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Detail(props) {
  return (
    <DetailWrapper>
      <GoBack onClick={props.history.goBack}>
        <ArrowBackIcon />
      </GoBack>
      <ImageContainer>
        <ImageDetail src={props.location.state.url} alt="picture" />
        <h1>This is Demo Text</h1>
      </ImageContainer>
    </DetailWrapper>
  );
}

export { Detail };

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
  top: 80px;
  position: fixed;
  left: 40px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ImageDetail = styled.img`
  display: flex;
  max-width: 600px;
  max-height: 400px;
  align-items: center;
  margin-right: 40px;
`;

const ImageContainer = styled.div`
  width: 1016px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
