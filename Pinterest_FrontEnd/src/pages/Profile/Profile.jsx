import React, { useState, useEffect } from "react";
import { userService } from "../../services/user.service";
import { user } from "../../util/user";
import { getMess } from "../../util/message";
import get from "lodash/get";
import { Grid } from "@material-ui/core";
import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Typography } from '@material-ui/core';

import Image1 from '../../components/image1/image1';
import map from "lodash/map";
import "./Profile.scss";

function Profile(props) {
  const [userProfile, setUserProfile] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);

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
      console.log(userPhotos)
    }, []);

  return (
    <Grid 
      className="wrapper"
      container
      justify="center" 
      alignItems="center"
    >
      <p className="error">{apiError}</p>
      <AddCircleOutlineIcon style={{height: 50, width: 50, color: "#0f9a89"}} />
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
      <Typography variant="h4">My pictures </Typography>
      <Grid className="myPictures">
        {map(userPhotos, (photo) => {
          return (
            <Image1 link={photo.link} />
          )
        })}
        
      </Grid>
    </Grid>
  )
}

export { Profile };
