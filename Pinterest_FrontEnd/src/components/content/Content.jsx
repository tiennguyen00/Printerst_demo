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
  let photoOfDatabase = [];
  let [videoOfDatabase, setVideoOfDatabase] = useState([]);
  const state = useSelector(state => state.userReducer.isLoad);

 useEffect(() => {
  fileService.getAllFile()
  .then((res) => {
    console.log("RES: ", res);
    photoOfDatabase = res.reverse().filter((item) => {
      if(item.originalName.split(".")[1] !== 'mp4')
        return true;
      return false;
    });

    videoOfDatabase = res.reverse().filter((item) => {
      if(item.originalName.split(".")[1] === 'mp4')
        return true;
      return false;
    });
    setVideoOfDatabase(videoOfDatabase);

    setPins([...photoOfDatabase, ...photoOfApi]);
  })
  .catch(err => {
    console.log("ERROR: ", err.message);
  });
 }, [photoOfApi, state]);

  return (
    <Wrapper>
      <Container className="content__container">
        {videoOfDatabase && videoOfDatabase.map((pin, index) => {
          return <Pin isVideo="true" key={index} url={pin.link} user={pin.photoOfUser} userID={pin.userID}  likes={pin.count} postID={pin._id} tags={pin.status} views={pin.views} downloads="0" />
        })}

        {pins.map((pin, index) => {
          if(pin.urls)
            return <Pin key={index} url={pin.urls} user={pin.user} downloads={pin.downloads} likes={pin.likes} tags={pin.tags} views={pin.views}/>;
          return <Pin key={index} url={pin.link} user={pin.photoOfUser} userID={pin.userID}  likes={pin.count} postID={pin._id} tags={pin.status} views={pin.views} downloads="0"/>
        })}
      </Container>
    </Wrapper>
  );
};

export default Content;
