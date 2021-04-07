import React, { useState, useEffect } from "react";
import { userService } from "../../services/user.service";
import { user } from "../../util/user";
import { getMess } from "../../util/message";
import get from "lodash/get";
import map from "lodash/map";
import "./Profile.scss";
import Pin from "../../components/Pin/Pin";
import styled from "styled-components";

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

  const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `;

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    align-items: center;
  `;

  const ProfilePhoto = styled.img`
    border-radius: 200%;
    width: 60px;
    height: 60px;
  `;

  const ProfileContent = styled.div`
    display: flex;
    width: 80%;
    height: 100%;
    padding: 40px 0;
  `;

  return (
    <ProfileContainer>
      <Wrapper>
        <ProfilePhoto src={userProfile.profilePhoto} alt="Not permission" />
        <form action=""></form>
        <p>{apiError}</p>
        <p>Email: {userProfile.email}</p>
        <p>Name: {userProfile.firstName}</p>
        <ProfileContent>
          {map(userPhotos, (photo) => {
            return <Pin link={photo.link} />;
          })}
        </ProfileContent>
      </Wrapper>
    </ProfileContainer>
  );
}

export { Profile };
