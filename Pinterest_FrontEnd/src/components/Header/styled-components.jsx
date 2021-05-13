import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: white;
  color: black;
  top: 0;
  position: fixed;
  z-index: 997;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color: #e60023;
    font-size: 32px;
    cursor: pointer;
    display: flex;
  }
`;

const Button = styled.div`
  display: flex;
  height: 48px;
  min-width: 123px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  cursor: pointer;
`;

const HomePageButton = styled(Button)`
  background-color: rgb(17, 17, 17);
  margin-right: 5px;
  a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
  :hover {
    opacity: 0.8;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
`;

const SearchBarWrapper = styled.div`
  background-color: #efefef;
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: 50px;
  border: none;
  padding-left: 10px;
  form {
    display: flex;
    flex: 1;
  }
  form > input {
    background-color: transparent;
    border: none;
    width: 100%;
    margin-left: 5px;
    font-size: 16px;
  }
  form > button {
    display: none;
  }
  input:focus {
    outline: none;
  }
`;

const IconsWrapper = styled.div``;

export {
  IconsWrapper,
  SearchWrapper,
  HomePageButton,
  Button,
  LogoWrapper,
  Wrapper,
  SearchBarWrapper,
};