import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { userService } from '../../services/user.service';
import "./Pin.scss";
import { setMessage } from '../../redux/message/messageActions';
import Dialog from '../../UI/Dialog/index';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
  video {
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 19px;
    object-fit: cover;
  }
`;

const Pin = (props) => {
  const {userID, postID, url, downloads, likes, tags, user, views, isVideo } = props;
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);

  const saveButton = () => {
    setDeleteConfirmOpened(false);
    let formData = new FormData();
    formData.append("linkFile", url);
    formData.append("photoOfUser", user);
    formData.append("originalName", tags);

    userService.postWithTicket(formData)
      .then(() => {
        dispatch(setMessage('Congratulated!! Photo was saved', 'success'));
      })
      .catch(err => {
        console.log("ERR: ", err.message);
        dispatch(setMessage('Opps, Something wrong!', 'error'))
      });
  }

  return (
    <Wrapper>
      <Container className="pin-container">
        <button className="pin-save-btn" onClick={() => setDeleteConfirmOpened(true)}>Save</button>
        {isLike ? (
          <div
            onClick={() => {
              setIsLike(!isLike);
            }}
            className="pin-like-btn"
          >
            <FavoriteIcon fontSize="default" style={{ color: "red" }} />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsLike(!isLike);
            }}
            className="pin-like-btn"
          >
            <FavoriteBorderIcon fontSize="default" style={{ color: "white" }} />
          </div>
        )}
        <Link
          to={{
            pathname: "detail",
            state: {
              url: url,
              downloads: downloads,
              likes: likes,
              tags: tags,
              user: user,
              views: views,
              isVideo: isVideo,
              postID
            },
          }}
        >
         {props.isVideo !== "true" ?  <img src={url} alt="pin" /> : 
         <video 
          loop
          preload="auto"
          onMouseOver={event => event.target.play()}
          onMouseOut={event => event.target.pause()}
          alt="video_alt"
          src={url}
          >
            <source src="https://drive.google.com/uc?id=1dE_dbgxeP_EMJOqLYu5Mq3NxGrQu1z2X"
          type="video/mp4"/>
          </video>}
        </Link>
      </Container>
      <Dialog 
        okText="Yes"
        onClose={() => setDeleteConfirmOpened(false)}
        onOk={saveButton}
        open={deleteConfirmOpened}
        title="Would you like to save this photo?"
      />
    </Wrapper>
  );
};

export default Pin;