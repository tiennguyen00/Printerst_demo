import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  margin-top: 15px;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  width: 80%;
  background-color: white;
`;

const Pin = () => {
  return (
    <Wrapper>
      <Container>Test</Container>
    </Wrapper>
  );
};

export default Pin;
