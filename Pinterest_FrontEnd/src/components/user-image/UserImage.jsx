import React from "react";
import styled from "styled-components";

const UserImage = (props) => {
  return <UserImg className="image" src={props.link} alt="picture" />;
};

export default UserImage;

const UserImg = styled.img`
  display: flex;
  width: 200px;
  height: 200px;

  cursor: zoom-in;
  object-fit: cover;
`;
