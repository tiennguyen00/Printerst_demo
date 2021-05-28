import React, { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import { fileService } from "../../services/file.service";
import {
  Container,
  Wrapper,
  AvatarWrapper,
  UserName,
  Comments,
  AddComment,
  Status,
  CommentButton,
} from "./styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../redux/message/messageActions";
import { loadComments } from "../../redux/file/fileActions";

const Comment = (props) => {
  const [data, setData] = useState({});
  const [comment, setComment] = useState();
  const [allCommentOfPhoto, setAllCommentOfPhoto] = useState([]);
  const userCurrent = useSelector((state) => state.userReducer.user);
  //
  const state = useSelector((state) => state.fileReducer.isLoad);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(userCurrent);
    fileService
      .getAllCommentById(props.postID)
      .then((res) => setAllCommentOfPhoto(res))
      .catch((err) => console.log("ERR: ", err.message));
  }, [state]);

  const handleSubmit = (e) => {
    document.getElementById("comment").value = "";
    e.preventDefault();
    setComment("");
    let formData = new FormData();
    formData.append("userID", data._id);
    formData.append("postID", props.postID);
    formData.append("ownerName", data.firstName + " " + data.lastName);
    formData.append("linkAvatar", data.profilePhoto);
    formData.append("content", comment);

    userService
      .postComment(formData)
      .then(() => {
        dispatch(setMessage("Success!!", "success"));
        dispatch(loadComments(!state));
      })
      .catch((err) => {
        console.log("Err: ", err.message);
        dispatch(setMessage("Sorry, Failed.", "error"));
      });
  };

  const resetInput = () => {
    setComment("");
    document.getElementById("comment").value = "";
  };

  return (
    <Container>
      <AddComment>
        <AvatarWrapper>
          <img src={data.profilePhoto} alt="" />
        </AvatarWrapper>
        <Comments style={{ flex: "1" }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id="comment"
              type="text"
              placeholder="Write your comment"
              style={{ width: "100%", flex: "1" }}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </form>
        </Comments>
        <CommentButton
          onClick={(e) => {
            handleSubmit(e);
            resetInput();
          }}
        >
          Comment
        </CommentButton>
      </AddComment>

      {allCommentOfPhoto &&
        allCommentOfPhoto.map((cmt, index) => {
          return (
            <Status key={index}>
              <AvatarWrapper>
                <img src={cmt.linkAvatar} alt="avatar" />
              </AvatarWrapper>
              <Wrapper>
                <UserName>{cmt.ownerName}</UserName>
                <Comments>{cmt.content}</Comments>
              </Wrapper>
            </Status>
          );
        })}
    </Container>
  );
};

export { Comment };
