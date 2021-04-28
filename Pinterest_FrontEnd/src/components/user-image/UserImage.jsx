import React from "react";
import styled from "styled-components";

const UserImage = (props) => {
  return <UserImg className="image" src={props.link} alt="User's picture" />;
};

export default UserImage;

const UserImg = styled.img`
  display: flex;
  width: 150px;
  height: 150px;

  cursor: zoom-in;
  object-fit: cover;
`;
