import React, { useState, useEffect } from "react";
import { userService } from "../../services/user.service";
import { user } from "../../util/user";
import { getMess } from "../../util/message";
import get from "lodash/get";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import UserImage from "../../components/user-image/UserImage";
import map from "lodash/map";

import {
  ImageContainer,
  Content,
  HR,
  AccountInfoItem,
  AccountInfo,
  AccountInfoText,
  Header,
  AvatarContainer,
  Avatar,
  Info,
  UserInfo,
  UserInfoText,
  Container,
} from "./styled-components";

import { GoBack } from "../../components/GoBackButton/GoBack";

function Profile(props) {
  const [userProfile, setUserProfile] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);

  const history = get(props, "history", {});
  const stateHistory = history.location.state || {};

  //thêm apiError để xác nhận  getPhotos với getProfile
  const [apiError, setApiError] = useState(
    stateHistory.expired ? getMess("M15") : ""
  );

  useEffect(() => {
    async function fetchData() {
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

      //Lấy ảnh mà user đã đăng
      userService
        .getPhotos()
        .then((res) => {
          setUserPhotos(res);
        })
        .catch((err) => {
          if (err === 400) setApiError("Not found any photo!!!");
          else setApiError(err.message);
        });
    }
    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Container>
        <p className="error">{apiError}</p>
        <Header>
          <GoBack onClick={props.history.goBack}>
            <ArrowBackIcon />
          </GoBack>

          <AvatarContainer>
            <Avatar src={userProfile.profilePhoto} />
          </AvatarContainer>

          <Info>
            <UserInfo>
              <UserInfoText>
                {userProfile.firstName} {userProfile.lastName}
              </UserInfoText>
              <UserInfoText>{userProfile.email}</UserInfoText>
            </UserInfo>

            <AccountInfo>
              <AccountInfoItem>
                <AccountInfoText>
                  <strong>0</strong>
                </AccountInfoText>
                <AccountInfoText>Followers</AccountInfoText>
              </AccountInfoItem>
              <AccountInfoItem>
                <AccountInfoText>
                  <strong>0</strong>
                </AccountInfoText>
                <AccountInfoText>Reacts</AccountInfoText>
              </AccountInfoItem>
              <AccountInfoItem>
                <AccountInfoText>
                  <strong>{userPhotos.length}</strong>
                </AccountInfoText>
                <AccountInfoText>Pictures</AccountInfoText>
              </AccountInfoItem>
            </AccountInfo>
          </Info>
        </Header>

        <HR />

        <Content>
          <h1>My pictures </h1>
          <ImageContainer>
            {map(userPhotos, (photo) => {
              return <UserImage link={photo.link} />;
            })}
          </ImageContainer>
        </Content>
      </Container>
    </div>
  );
}

export { Profile };
