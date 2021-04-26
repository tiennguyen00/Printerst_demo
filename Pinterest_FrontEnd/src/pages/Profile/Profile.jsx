import React, { useState, useEffect } from "react";
import { userService } from "../../services/user.service";
import { user } from "../../util/user";
import { getMess } from "../../util/message";
import get from "lodash/get";

import UserImage from "../../components/user-image/UserImage";
import map from "lodash/map";

import {
  ImageContainer,
  Content,
  HR,
  AccountInformationItem,
  AccountInformation,
  AccountInformationText,
  Header,
  AvatarContainer,
  Avatar,
  Information,
  UserInformation,
  UserInformationText,
  Container,
} from "./styled-components";

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
    <Container>
      <p className="error">{apiError}</p>
      <Header>
        <AvatarContainer>
          <Avatar src={userProfile.profilePhoto} />
        </AvatarContainer>

        <Information>
          <UserInformation>
            <UserInformationText>
              {userProfile.firstName} {userProfile.lastName}
            </UserInformationText>
            <UserInformationText>{userProfile.email}</UserInformationText>
          </UserInformation>

          <AccountInformation>
            <AccountInformationItem>
              <AccountInformationText>
                <strong>0</strong>
              </AccountInformationText>
              <AccountInformationText>Followers</AccountInformationText>
            </AccountInformationItem>
            <AccountInformationItem>
              <AccountInformationText>
                <strong>0</strong>
              </AccountInformationText>
              <AccountInformationText>Reacts</AccountInformationText>
            </AccountInformationItem>
            <AccountInformationItem>
              <AccountInformationText>
                <strong>{userPhotos.length}</strong>
              </AccountInformationText>
              <AccountInformationText>Pictures</AccountInformationText>
            </AccountInformationItem>
          </AccountInformation>
        </Information>
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
  );
}

export { Profile };
