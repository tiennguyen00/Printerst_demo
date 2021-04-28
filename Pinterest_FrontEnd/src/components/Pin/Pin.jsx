import React, { useState } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Pin.scss";

const Wrapper = styled.div`
  display: inline-flex;
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;

  img {
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 19px;
    object-fit: cover;
  }
`;

const Pin = (props) => {
  const { url } = props;

  const [isLike, setIsLike] = useState(false);

  return (
    <Wrapper>
      <Container className="pin-container">
        <button className="pin-save-btn">Save</button>
        {isLike ? (
          <div
            onClick={() => {
              setIsLike(!isLike);
            }}
            className="pin-like-btn"
          >
            <FavoriteIcon fontSize="large" style={{ color: "#e7e5e6" }} />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsLike(!isLike);
            }}
            className="pin-like-btn"
          >
            <FavoriteBorderIcon fontSize="large" style={{ color: "#e7e5e6" }} />
          </div>
        )}
        <Link
          to={{
            pathname: "detail",
            state: { url: url },
          }}
        >
          <img src={url} alt="pin" />
        </Link>
      </Container>
    </Wrapper>
  );
};

export default Pin;
