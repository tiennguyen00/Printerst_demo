import { useSelector } from "react-redux";
import Pin from "../Pin/Pin";
import "./Content.css";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  margin-top: 100px;
  justify-content: center;
`;

const Container = styled.div`
  height: 100%;
  background-color: white;
`;

const Content = () => {
  const pins = useSelector((state) => state.pinReducer.pins);
  console.log(pins);

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
