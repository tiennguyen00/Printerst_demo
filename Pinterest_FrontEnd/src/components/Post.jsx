import React from "react";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';

import "../styles/css/Content.css";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 1
`;

const Button = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 80%;
  margin-left: 90%;
  z-index: 1
`;

const Container = styled.div`
  height: 100%;
  background-color: white;
`;

const Post = () => {

  const handleClick = () => {
    console.log("click")
  }
  
  return (
    <Wrapper>
        <form action="/action_page.php">
  <label htmlFor="fname">First name:</label><br />
  <input type="text" id="fname" name="fname" defaultValue="John" /><br />
  <label htmlFor="lname">Last name:</label><br />
  <input type="text" id="lname" name="lname" defaultValue="Doe" /><br /><br />
  <input type="submit" defaultValue="Submit" />
</form>
      <Button>
        <IconButton onClick={handleClick}>
            <AddCircleIcon style={{ fontSize: 50, color: "white"}}/>
        </IconButton>
      </Button>
        
    </Wrapper>
  );
};

export default Post;
