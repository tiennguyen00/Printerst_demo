import React from "react";
import {useForm} from "react-hook-form";

import "./Post.css";

const Post = ({isPostOpen, closePost}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    closePost();
  }
  
  return isPostOpen ? (
    <div className="form-popup">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1>Post</h1>
        <label htmlFor="status"><b>Status</b></label>
        <textarea name="status" ref={register} placeholder="How do you feel?"/>
        <label htmlFor="image"><b>Image</b></label>
        <input type="file" ref={register} name="image"/>
        <button type="submit" className="btn">Post</button>
        <button type="button" className="btn cancel" onClick={closePost}>Close</button>
      </form>
    </div>
  ) : "";
};

export default Post;
