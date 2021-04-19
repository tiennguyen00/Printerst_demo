import React from "react";
import styled from "styled-components";

import './Pin.scss';

const Pin = (props) => {
  let { urls } = props;

  return ( 
      <div className="wrapper">
        <div className="container">
          <img src={urls?.regular} alt="pin" />
        </div>
      </div>
  );
};

export default Pin;
