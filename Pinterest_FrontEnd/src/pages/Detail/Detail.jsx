import React from "react";
import {
  DetailWrapper,
  ImageContainer,
  ImageDetail,
  ImageInformation,
} from "./styled-components";
import { GoBack } from "../../components/GoBackButton/GoBack";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ScrollToTop } from "../HomePage/scroll";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import GetAppIcon from "@material-ui/icons/GetApp";

const Detail = (props) => {
  return (
    <DetailWrapper>
      <GoBack onClick={props.history.goBack}>
        <ArrowBackIcon />
      </GoBack>
      <ImageContainer>
        <ImageDetail src={props.location.state.url} alt="picture" />
        <ImageInformation>
          <h1>User: {props.location.state.user}</h1>
          <h1>
            <VisibilityIcon /> {props.location.state.views}
          </h1>
          <h1>
            <GetAppIcon /> {props.location.state.downloads}
          </h1>
          <h1>
            <ThumbUpAltIcon /> {props.location.state.likes}
          </h1>
          <h1>
            <LocalOfferIcon /> {props.location.state.tags}
          </h1>
        </ImageInformation>
      </ImageContainer>

      <ScrollToTop />
    </DetailWrapper>
  );
};

export { Detail };
