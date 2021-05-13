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
import { Comment } from "../../components/comment/Comment";

const Detail = (props) => {
  return (
    <div style={{ height: "100vh" }}>
      <DetailWrapper>
        <GoBack onClick={props.history.goBack}>
          <ArrowBackIcon />
        </GoBack>
        <ImageContainer>
          <ImageDetail src={props.location.state.url} alt="picture" />
          <ImageInformation>
            <h1>User: {props.location.state.user}</h1>
            <h4>
              <VisibilityIcon style={{ fill: "#111", marginRight: "10px" }} />
              {props.location.state.views}
            </h4>
            <h4>
              <GetAppIcon style={{ fill: "#111", marginRight: "10px" }} />
              {props.location.state.downloads}
            </h4>
            <h4>
              <ThumbUpAltIcon
                style={{ fill: "#0074e8", marginRight: "10px" }}
              />
              {props.location.state.likes}
            </h4>
            <h4>
              <LocalOfferIcon
                style={{ fill: "#e3780c", marginRight: "10px" }}
              />
              {props.location.state.tags}
            </h4>
          </ImageInformation>
        </ImageContainer>

        <Comment />

        <ScrollToTop />
      </DetailWrapper>
    </div>
  );
};

export { Detail };
