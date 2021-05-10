import React, {useState} from "react";
import styled from "styled-components";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
<<<<<<< HEAD
=======
import { useDispatch } from 'react-redux';
import { showViewer } from '../../redux';
import { Link } from 'react-router-dom';
>>>>>>> badd24d583b62b797d385d77559ae0af07222b84

import "./Pin.scss";

const Wrapper = styled.div`
  display: inline-flex;
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;
<<<<<<< HEAD

=======
>>>>>>> badd24d583b62b797d385d77559ae0af07222b84
  img {
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 19px;
    object-fit: cover;
  }
`;

const Pin = (props) => {
<<<<<<< HEAD
  let { urls } = props;
  const [isLike, setIsLike] = useState(false);

  const test = () => {
    console.log('tét')
=======
  let { url } = props;
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();

  const test = () => {
    dispatch(showViewer(props.id));
>>>>>>> badd24d583b62b797d385d77559ae0af07222b84
  }
  
  const save = () => {
    console.log('save');
  };

  return (
    <Wrapper>
      <Container className="pin-container">
<<<<<<< HEAD
        <img src={urls?.regular} alt="pin" />
        <div className="pin-overlay" onClick={() => test()} ></div>
        <button className="pin-save-btn" onClick={() => save()}>Save</button>
        {isLike ? <div onClick={() => {setIsLike(!isLike)}} className="pin-like-btn"><FavoriteIcon  fontSize="large" style={{ color: '#e7e5e6' }}/></div>
                : <div onClick={() => {setIsLike(!isLike)}} className="pin-like-btn"><FavoriteBorderIcon  fontSize="large" style={{ color: '#e7e5e6' }}/></div>}
=======
        <button className="pin-save-btn">Save</button>
        {isLike ? (
          <div
            onClick={() => {
              setIsLike(!isLike);
            }}
            className="pin-like-btn"
          >
            <FavoriteIcon fontSize="default" style={{ color: "red" }} />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsLike(!isLike);
            }}
            className="pin-like-btn"
          >
            <FavoriteBorderIcon fontSize="default" style={{ color: "white" }} />
          </div>
        )}
        <Link
          to={{
            pathname: "detail",
            state: { url: url },
          }}
        >
          <img src={url} alt="pin" />
        </Link>
>>>>>>> badd24d583b62b797d385d77559ae0af07222b84
      </Container>
    </Wrapper>
  );
};

export default Pin;
