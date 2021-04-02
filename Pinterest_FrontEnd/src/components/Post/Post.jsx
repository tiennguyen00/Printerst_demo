<<<<<<< HEAD
import React, {useState} from "react";
import {useForm} from "react-hook-form";

import "./Post.scss"

const Post = ({isPostOpen, closePost}) => {
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImg] = useState('');
=======
import React from "react";
import { useForm } from "react-hook-form";

import "./Post.css";

const Post = ({ isPostOpen, closePost }) => {
>>>>>>> b935cc25f7d2528d37b10017ce3f5c883d959419
  const { register, handleSubmit } = useForm();

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImg(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const onSubmit = (data) => {
    console.log(data);
    closePost();
<<<<<<< HEAD
  }

  let $imagePreview = imagePreviewUrl ? (<div className="imgPreview"><img src={imagePreviewUrl}/></div>): '';
  
  return isPostOpen ? (
    <div className="form-popup">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1>Post <span className="close" onClick={closePost}>x</span></h1>
        <label htmlFor="status"><b>Status</b></label>
        <textarea name="status" ref={register} placeholder="How do you feel?"/>
        <label htmlFor="image"><b>Image</b></label>
        <input type="file" ref={register} name="image" accept="image/*" onChange={(e)=> handleImageChange(e)}/>
        {$imagePreview}
        <button type="submit" className="btn">Post</button>
=======
  };

  return isPostOpen ? (
    <div className="form-popup">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1>Post</h1>
        <label htmlFor="status">
          <b>Status</b>
        </label>
        <textarea name="status" ref={register} placeholder="How do you feel?" />
        <label htmlFor="image">
          <b>Image</b>
        </label>
        <input type="file" ref={register} name="image" />
        <button type="submit" className="btn">
          Post
        </button>
        <button type="button" className="btn cancel" onClick={closePost}>
          Close
        </button>
>>>>>>> b935cc25f7d2528d37b10017ce3f5c883d959419
      </form>
    </div>
  ) : (
    ""
  );
};

export default Post;
