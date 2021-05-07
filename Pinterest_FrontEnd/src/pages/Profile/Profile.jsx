import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { userService } from "../../services/user.service";
import { user } from "../../util/user";
import { getMess } from "../../util/message";
import get from "lodash/get";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Post from '../../components/Post/Post';
import {getCurrentUser} from '../../redux/user/userAction';

import Image1 from '../../components/image1/image1';
import map from "lodash/map";
import "./Profile.scss";

function Profile(props) {
  const dispatch = useDispatch();
  const [isPostOpen, setPostOpen] = useState(false); // dùng để mở Post
  const defaultNumberToRender = 5; //Số lượng hình ảnh mặc định đc render;
  const [userProfile, setUserProfile] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);
  const [photoToShow, setPhotoToShow] = useState([]);

  const history = get(props, "history", {});
  const stateHistory = history.location.state || {};
  const [apiError, setApiError] = useState(
    stateHistory.expired ? getMess("M15") : ""
  );

  //thêm apiError để xác nhận 2 cái. getPhotos với get Profile
  useEffect(async () => {
    //Lấy ảnh đại diện
    userService
      .getProfile()
      .then((res) => {
        setUserProfile(res);
        dispatch(getCurrentUser(res));
      })
      .catch((err) => {
        if (err === 400) setApiError("Load fail!!!");
        else setApiError(err.message);
      });

    //Lấy ảnh mà user đó đã đăng
    userService
      .getPhotos()
      .then((res) => {
        setUserPhotos(res);
      })
      .catch((err) => {
        if (err === 400) setApiError("Not found any photo!!!");
        else setApiError(err.message);
      });
    }, []);

    const handleDefaultView = useCallback(() => {
      const data = userPhotos.filter((item, index) => index < defaultNumberToRender);
      setPhotoToShow(data);
    }, [userPhotos.length, defaultNumberToRender]);

    const handleShowMore = () => {
      const data = userPhotos.filter(
        (item, index) => index >= photoToShow.length && index < photoToShow.length + defaultNumberToRender,
      );

      setPhotoToShow(state => [...state, ...data]);
    }

    useEffect(() => {
      handleDefaultView();
    }, [userPhotos.length, handleDefaultView]);

    useEffect(() => {
      setPhotoToShow(userPhotos.slice(0, photoToShow.length === 0 ? defaultNumberToRender : photoToShow.length));
    }, [userPhotos]);

    // const dispatch = useDispatch();
    // const onClick = fileId => {
    //   dispatch(showViewer(fileId));
    // };

  return (
    <>
      <Grid 
        className="wrapper"
        container
        justify="center" 
        alignItems="center"
      >
        <p className="error">{apiError}</p>
        <AddCircleOutlineIcon onClick={() => setPostOpen(!isPostOpen)} style={{height: 50, width: 50, color: "#0f9a89"}} />
        <Grid className="wrapper__main">  
          <div className="circle1">
            <Avatar className="profile" style={{height: 200, width: 200}} src={userProfile.profilePhoto} />
          </div>

          <Typography className="text1" variant="h5">{userProfile.firstName} {userProfile.lastName}</Typography>
          <Typography className="text2" variant="h5">{userProfile.email}</Typography>
        </Grid>
        <RadioButtonUncheckedIcon style={{height: 50, width: 50, color:"#BE1E2D" }}/>
        <Grid
          container 
          className="wrapper__sub"
          justify="center"
          alignItems="center" 
        >
          <Box className="box" display="flex" flexDirection="column">
            <Typography variant="h6" className="text3">
              0
            </Typography>
            <Typography variant="h6" className="text3">
              Followers
            </Typography>
          </Box>
          <Box className="box" display="flex" flexDirection="column">
            <Typography variant="h6" className="text3">
              0
            </Typography>
            <Typography variant="h6" className="text3">
              Reacts
            </Typography>
          </Box>
          <Box className="box" display="flex" flexDirection="column" >
            <Typography variant="h6" className="text3">
              {userPhotos.length}
            </Typography>
            <Typography variant="h6" className="text3">
              Pictures
            </Typography>
          </Box>
        </Grid>

        <Typography className="photos__label" variant="h6">My Pictures</Typography>
        <Grid container className="photos__container">
          {photoToShow && map(photoToShow, (photo) => {
            return (
              <Grid item className="photos__item">
                <Paper className="photos__paper">
                  <Image1 id={photo._id} link={photo.link} height={'100%'} width={'100%'}/>
                </Paper>
              </Grid>
            )
          })}
        </Grid>

        <div className="toggle-section">
          {photoToShow.length < userPhotos.length && 
            <div aria-hidden="true" className="toggle-section toggle-section__more" onClick={handleShowMore}>
              <Typography className="toggle-section__text" variant="caption" color="primary">
                More
              </Typography>
              <ArrowDropDownIcon className="toggle-section__icon" color="primary"></ArrowDropDownIcon>
            </div>
          }
          {photoToShow.length > defaultNumberToRender && 
            <div aria-hidden="true" className="toggle-section toggle-section__collapse" onClick={handleDefaultView}>
              <Typography className="toggle-section__text" variant="caption" color="primary">
                Collapse
              </Typography>
              <ArrowDropUpIcon className="toggle-section__icon" color="primary"></ArrowDropUpIcon>
            </div>
          }
        </div>
      </Grid>
      <Post isPostOpen={isPostOpen} closePost={() => setPostOpen(false)}></Post>
    </>
  )
}

export { Profile };
