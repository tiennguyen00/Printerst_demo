import styled from "styled-components";

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  @media only screen and (min-width: 1600px) {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;

const Wrapper = styled(Container)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
  }

  @media only screen and (min-width: 1600px) {
  }
`;

const AvatarWrapper = styled.div`
  width: fit-content;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
  }

  @media only screen and (min-width: 1600px) {
  }
`;

const AddComment = styled(Container)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
  }

  @media only screen and (min-width: 1600px) {
  }
`;

const Status = styled(Container)`
  flex-direction: row;
  width: 100%;
  margin-top: 20px;

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
  }

  @media only screen and (min-width: 1600px) {
  }
`;

const UserName = styled.h1`
  width: fit-content;
  font-weight: 600;
  font-size: 20px;

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
  }

  @media only screen and (min-width: 1600px) {
  }
`;

const Comments = styled(UserName)`
  font-size: 18px;
  font-weight: 300;

  input[type="text"] {
    padding: 10px;
    border-radius: 19px;
    border: none;
    outline: none;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
  }

  @media only screen and (min-width: 1600px) {
  }
`;

const CommentButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  border-radius: 19px;
  border: none;
  background-color: #1877f2;
  color: white;
  font-weight: 300;
  cursor: pointer;
`;

export {
  Container,
  Wrapper,
  AvatarWrapper,
  UserName,
  Comments,
  AddComment,
  Status,
  CommentButton,
};
