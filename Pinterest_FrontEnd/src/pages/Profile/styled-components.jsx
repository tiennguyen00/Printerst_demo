import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 50%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding: 100px 20px 20px;
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

const Info = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfoText = styled.span`
  font-weight: 300;
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 10px;
`;

const AccountInfoText = styled.span`
  margin-top: 20px;
  margin-right: 5px;
`;

const AccountInfo = styled.ul`
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AccountInfoItem = styled.li`
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

export {
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
};
