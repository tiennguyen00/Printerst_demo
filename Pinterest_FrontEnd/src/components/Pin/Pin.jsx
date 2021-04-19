import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-flex;
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;

  img {
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 19px;
    object-fit: cover;
  }
`;

const Pin = (props) => {
  let { urls } = props;

  return (
    <Wrapper>
      <Container>
        <img src={urls?.regular} alt="pin" />
      </Container>
    </Wrapper>
  );
};

export default Pin;
