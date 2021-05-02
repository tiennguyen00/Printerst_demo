import React, {useEffect} from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import Pin from '../Pin/Pin';
import "./Content.css";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  margin-top: 15px;
  justify-content: center;
`;

const Container = styled.div`
  height: 100%;
  background-color: white;
`;

const Content = () => {
  const pins = useSelector(state => state.pinReducer.pins);
  console.log(pins);

  return (
    <Wrapper>
      <Container className="content__container">
        {pins.map((pin, index) => {
          let { urls, id } = pin;
          return <Pin key={index} url={urls} />;
        })}
      </Container>
    </Wrapper>
  );
};

export default Content;
