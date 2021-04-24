import React from "react";
import styled from "styled-components";

export default function UserImage(props) {
  return <UserImg className="image" src={props.link} alt="picture" />;
}

const UserImg = styled.img`
  display: flex;
  width: 150px;
  height: 150px;

  cursor: zoom-in;
  object-fit: cover;
`;
