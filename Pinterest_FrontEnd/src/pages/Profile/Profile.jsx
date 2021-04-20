import React, { useState, useEffect } from "react";
import { userService } from "../../services/user.service";
import { user } from "../../util/user";
import { getMess } from "../../util/message";
import get from "lodash/get";

import UserImage from "../../components/user-image/UserImage";
import map from "lodash/map";

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

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 50%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 20px 20px;
`;

const AvatarContainer = styled.div`
  min-width: 250px;
  margin-left: auto;
  margin-right: auto;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const Information = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  flex-direction: column;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInformationText = styled.span`
  font-weight: 300;
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 10px;
`;

const AccountInformationText = styled.span`
  margin-top: 20px;
  margin-right: 5px;
`;

const AccountInformation = styled.ul`
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AccountInformationItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 16px;
  list-style-type: none;
  margin-right: 40px;
`;

const HR = styled.hr`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;

  h1 {
    text-align: center;
    font-weight: 300;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;

  column-gap: 3px;
`;
