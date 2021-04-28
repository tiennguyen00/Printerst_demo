import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import { IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';

import { userService } from '../../services/user.service';

import "./Post.scss"

const Post = ({isPostOpen, closePost}) => {

  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImg] = useState('');
  const [userProfile, setUserProfile] = useState();
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

  useEffect(async () => {
    userService
      .getProfile()
      .then((res) => {
        setUserProfile(res);
      })
      .catch((err) => {});
  }, []);

  

  const onSubmit = (data) => {
    const { status} = data;

    let formData  =  new FormData();
    formData.append('userID', userProfile._id);
    formData.append('status', status);
    formData.append('linkFile', file);
  
    console.log(formData);
    userService.post(formData);
}

  let avatar = userProfile ? userProfile.profilePhoto : '';
  let $imagePreview = imagePreviewUrl ? (<span className="imgPreview"><img src={imagePreviewUrl}/></span>): '';

  return isPostOpen ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="text">
          <h1 className="post-title">Create Post</h1>
          <span className="close" onClick={closePost}>
            <IconButton>
             <CancelIcon fontSize="large"/>
            </IconButton>
          </span>
          <hr/>
          <img className="post-avatar" src={avatar}/>
          <textarea name="status" ref={register} placeholder="What's in your mind?"></textarea>
          <input className="file-input" type="file" ref={register} name="file" onChange={(e)=> handleImageChange(e)}/>
          {$imagePreview}
          <input type="submit" value="post"/>
        </div>
      </section>
      <div className="overlay"></div>
    </form>
  ) : (
    ""
  );
};

export default Post;