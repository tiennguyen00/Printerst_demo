import styled from "styled-components";
import { useSelector } from "react-redux";
import Pin from "../Pin/Pin";
import "./Content.css";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  margin: 0 auto;
`;

const Container = styled.div`
  height: 100%;
  background-color: white;
`;

const Content = () => {
  const pins = useSelector((state) => state.pins);

  return (
    <Wrapper>
      <div style={{ paddingTop: "80px", backgroundColor: "transparent" }}></div>
      <Container className="content__container">
        {pins.map((pin, index) => {
          return <Pin key={index} url={pin.urls} />;
        })}
      </Container>
    </Wrapper>
  );
};

export default Content;
