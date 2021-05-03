import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Avatar } from "@material-ui/core";

import { user } from "../../util/user";
import { userService } from "../../services/user.service";

import "./Post.scss";
import { ContentContainer, FormWrapper, ImgWrapper } from "./styled-conponents";

const Post = ({ isPostOpen, closePost }) => {
  const [file, setFile] = useState("");
  const [fileUploaded, setFileUploaded] = useState("");
  const [imagePreviewUrl, setImg] = useState("");
  const [userID, setUserID] = useState("");
  const { register, handleSubmit } = useForm();
  const [avatar, setAvatar] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImg(reader.result);
    };

    setFileUploaded(e.target.files[0]);
    reader.readAsDataURL(file);
    console.log(setFileUploaded(""));
  };

  useEffect(() => {
    async function fetchUserInfo() {
      let userInfo = user.getUserInfo();
      setUserID(userInfo.id);
    }
    fetchUserInfo();
  }, []);

  const onSubmit = (data) => {
    const { status } = data;

    let formData = new FormData();
    formData.append("userID", userID);
    formData.append("status", status);
    formData.append("linkFile", fileUploaded);

    userService.post(formData);
  };

  let $imagePreview = imagePreviewUrl ? (
    <div
      className="imgPreview"
      style={{ border: "1px solid black", borderRadius: "20px" }}
    >
      <img
        src={imagePreviewUrl}
        alt="Preview"
        style={{ borderRadius: "20px" }}
      />
    </div>
  ) : (
    ""
  );

  let $showInput = imagePreviewUrl ? (
    ""
  ) : (
    <div
      className="input"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "20px",
      }}
    >
      <p style={{ position: "absolute", textAlign: "center", width: "100%" }}>
        Drag and drop or click here to upload{" "}
      </p>

      <input
        id="file-input"
        type="file"
        accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
        aria-hidden="true"
        style={{
          cursor: "pointer",
          width: "100%",
          height: "100%",
          opacity: "0",
        }}
        name="Post file"
        ref={register}
        onChange={(e) => handleImageChange(e)}
      />
    </div>
  );

  return isPostOpen ? (
    <div className="overlay">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="wrapper">
          <div className="postImg-form">
            <div className="title" style={{ width: "100%", height: "30px" }}>
              <h1 className="post-title">Post Your Image</h1>
            </div>

            <span className="close" onClick={closePost}>
              <IconButton>
                <CancelIcon fontSize="large" />
              </IconButton>
            </span>

            <ContentContainer>
              <ImgWrapper>
                {$imagePreview} {$showInput}
              </ImgWrapper>

              <FormWrapper className="form">
                <input
                  type="text"
                  placeholder="Create a title"
                  style={{
                    border: "none",
                    height: "40px",
                    fontSize: "24px",
                    outline: "none",
                    width: "100%",
                    paddingLeft: "10px",
                  }}
                />
                <hr
                  style={{
                    opacity: "0.7",
                    width: " 100%",
                    margin: "0 auto",
                  }}
                />

                <textarea
                  name="status"
                  ref={register}
                  placeholder="What's in your mind?"
                />

                <hr
                  style={{
                    opacity: "0.7",
                    width: " 100%",
                    margin: "0 auto",
                  }}
                />

                <input className="submit-button" type="submit" value="Post" />
              </FormWrapper>
            </ContentContainer>
          </div>
        </div>
      </form>
    </div>
  ) : (
    ""
  );
};

export default Post;
