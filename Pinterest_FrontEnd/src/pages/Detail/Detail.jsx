import React, { useState, useEffect } from "react";
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Comment } from "../../components/comment/Comment";
import { useLocation } from "react-router-dom";
import { fileService } from "../../services/file.service";

const Detail = (props) => {
  let [isLike, setIsLike] = useState(false);
  let [countLike, setCountLike] = useState(props.location.state.likes);
  const location = useLocation();

  useEffect(() => {
    const payload = {
      postID: props.location.state.postID,
      views: props.location.state.views + 1,
      count: countLike,
    };

    fileService
      .updateFileById(payload)
      .then((res) => console.log(res))
      .catch((err) => console.log("ERR: ", err.message));
  }, [countLike]);

  useEffect(() => {
    const payload = {
      postID: props.location.state.postID,
      views: props.location.state.views + 1,
    };

    fileService
      .updateFileById(payload)
      .then((res) => console.log(res))
      .catch((err) => console.log("ERR: ", err.message));
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <DetailWrapper>
        <GoBack onClick={props.history.goBack}>
          <ArrowBackIcon />
        </GoBack>
        <ImageContainer>
          {props.location.state.isVideo !== "true" ? (
            <ImageDetail>
              <img src={props.location.state.url} alt="" />
            </ImageDetail>
          ) : (
            <ImageDetail>
              <video alt="name" src={props.location.state.url} controls>
                <source
                  src="https://drive.google.com/uc?id=1dE_dbgxeP_EMJOqLYu5Mq3NxGrQu1z2X"
                  type="video/mp4"
                />
              </video>
            </ImageDetail>
          )}

          <ImageInformation>
            <h1>Upload by: {props.location.state.user}</h1>
            <h4>
              <VisibilityIcon style={{ fill: "#111", marginRight: "10px" }} />
              {props.location.state.views}
            </h4>

            <h4>
              <GetAppIcon style={{ fill: "#111", marginRight: "10px" }} />
              {props.location.state.downloads}
            </h4>

            {!isLike ? (
              <h4>
                <FavoriteBorderIcon
                  onClick={() => {
                    setIsLike(!isLike);
                    setCountLike((countLike += 1));
                  }}
                  style={{ marginRight: "10px" }}
                />
                <h4>{countLike}</h4>
              </h4>
            ) : (
              <h4>
                <FavoriteIcon
                  onClick={() => {
                    setIsLike(!isLike);
                    setCountLike((countLike -= 1));
                  }}
                  style={{ fill: "#BE1E2D", marginRight: "10px" }}
                />
                <h4>{countLike}</h4>
              </h4>
            )}

            <h4>
              <LocalOfferIcon
                style={{ fill: "#e3780c", marginRight: "10px" }}
              />
              {props.location.state.tags}
            </h4>
          </ImageInformation>
        </ImageContainer>

        <Comment postID={props.location.state.postID} />
        <ScrollToTop />
      </DetailWrapper>
    </div>
  );
};

export { Detail };
