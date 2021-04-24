import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { get } from "lodash/get";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import { user } from "../../util/user";
import { getMess } from "../../util/message";
import { userService } from "../../services/user.service";

import "./Post.scss";

const Post = ({ isPostOpen, closePost }) => {
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");
  const [imagePreviewUrl, setImg] = useState("");
  const [userID, setUserID] = useState("");
  const { register, handleSubmit } = useForm();

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImg(reader.result);
    };

    setFile1(e.target.files[0]);
    reader.readAsDataURL(file);
  };

  useEffect(async () => {
    let userInfo = user.getUserInfo();
    setUserID(userInfo.id);
    console.log(userID);
  }, []);

  const onSubmit = (data) => {
    // setApiError('');

    const { status, file } = data;

    let formData = new FormData();
    formData.append("userID", userID);
    formData.append("status", status);
    formData.append("linkFile", file1);

    console.log(formData);
    userService.post(formData);
    // authService.updateRegisterProfile(formData)
    //     .then(() => history.push(stateHistory.prePath || '/home'))
    //     .catch((err) => setApiError(err.message));
  };

  let $imagePreview = imagePreviewUrl ? (
    <span className="imgPreview">
      <img src={imagePreviewUrl} alt="preview" />
    </span>
  ) : (
    ""
  );

  return isPostOpen ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="text">
          <img src="http://placehold.it/100/100" />
          <span className="close" onClick={closePost}>
            <IconButton>
              <CancelIcon fontSize="large" />
            </IconButton>
          </span>
          <textarea
            name="status"
            ref={register}
            placeholder="What's in your mind"
          ></textarea>
          <input
            className="file-input"
            type="file"
            ref={register}
            name="file"
            onChange={(e) => handleImageChange(e)}
          />
          {$imagePreview}
          <input type="submit" value="post" />
        </div>
      </section>
      <div class="overlay"></div>
    </form>
  ) : (
    ""
  );
};

export default Post;
