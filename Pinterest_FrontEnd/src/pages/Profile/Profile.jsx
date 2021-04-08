import React, { useState, useEffect } from "react";
import { userService } from "../../services/user.service";
import { user } from "../../util/user";
import { getMess } from "../../util/message";
import get from "lodash/get";
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
  }, []);

  return (
        <div>
          <p>{apiError}</p>
          <p>Email: {userProfile.email}</p>
          <p>Name: {userProfile.firstName}</p>
          <p>Profile: {userProfile.profilePhoto}</p>


          {map(userPhotos, (photo) => {
            return (
              <img src = {photo.link} />
            )
          })}
        </div>
  )
}

export { Profile };
