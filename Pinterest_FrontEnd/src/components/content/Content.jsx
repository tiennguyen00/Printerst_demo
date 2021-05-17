import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Pin from "../Pin/Pin";
import "./Content.css";
import { fileService }  from '../../services/file.service';

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
  const [pins, setPins] = useState([]);
  const photoOfApi = useSelector(state => state.pinReducer.pins);

 useEffect(() => {
  fileService.getAllFile()
  .then((res) => {
    const photoOfDatabase = res;
    setPins([...photoOfDatabase, ...photoOfApi]);
  })
  .catch(err => {
    console.log("ERROR: ", err.message);
  });
 }, [photoOfApi]);

  return (
    <Wrapper>
      <Container className="content__container">
        {pins.map((pin, index) => {
          if(pin.urls)
            return <Pin key={index} url={pin.urls} user={pin.user} downloads={pin.downloads} likes={pin.likes} tags={pin.tags} views={pin.views}/>;
          return <Pin key={index} url={pin.link} userID={pin.userID} postID={pin._id}/>
        })}
      </Container>
    </Wrapper>
  );
};

export default Content;
