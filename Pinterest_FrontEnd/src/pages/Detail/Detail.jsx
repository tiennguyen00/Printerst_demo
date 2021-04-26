import React from "react";
import {
  DetailWrapper,
  ImageContainer,
  ImageDetail,
  GoBack,
} from "./styled-components";
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
