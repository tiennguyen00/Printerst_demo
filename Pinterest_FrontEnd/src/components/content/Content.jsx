import { useSelector } from "react-redux";
import Pin from "../Pin/Pin";
import "./Content.css";
import { Wrapper, Container } from "./styled-components";

const Content = () => {
  const pins = useSelector((state) => state.pins);

  return (
    <Wrapper>
      <Container className="content__container">
        {pins.map((pin, index) => {
          return (
            <Pin
              key={index}
              url={pin.urls}
              user={pin.user}
              downloads={pin.downloads}
              likes={pin.likes}
              tags={pin.tags}
              views={pin.views}
            />
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default Content;
