import React from 'react';
import map from 'lodash/map';  // Tạo ra một mảng các giá trị bằng cách for các phần tử
import isEmpty from 'lodash/isEmpty'; //Kiểm tra gtri truyền vào có trống ko (boolean)
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'; //Kiếm tra Runtime cho React-prop hoặc object tương tự
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Header from "./components/Header";
import Content from "./components/content/Content";
import Post from "./components/Post";
import unsplash from "./api/unsplash";
import { useState, useEffect } from "react";

const theme = createMuiTheme({
  palette: {
    primary: { main: colorPrimary },
    secondary: { main: colorSecondary },
  },
  text: {
    primary: colorPrimaryTypo,
    secondary: colorSecondaryTypo
  },
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});

const components = {
  HomePage,
  Verify
};

function App ({ history, ...rest }){
  const [isVerifyPage, setIsVerifyPage] = React.useState(false);

  React.useEffect(() => {
    const isVerify = window.location.pathname === '/verify';
    setIsVerifyPage(isVerify);
  }, [window.location.pathname]);
    
  //Kiểm tra xem user có đăng nhập trước đó hay không
  const redirectHomePage = () => {
    const userInfo = user.getUserInfo();

    if(isEmpty(userInfo) || !userInfo.role) {
      return <Redirect to='/login' />;
    }
    return <Redirect to="/home" />;
  };

  useEffect(() => {
    getNewPins();
  }, []);

  const closePost = () => {
    setPostOpen(false);
  }

  return (
      <div className="app">
      {/* Header */}
      <Header onSubmit={onSearchSubmit} />
      {/* Main Content */}
      
      <Content pins={pins} />

      <div className="post-btn">
        <IconButton onClick={() => setPostOpen(!isPostOpen)}>
            <AddCircleIcon style={{ fontSize: 50, color: "red"}}/>
        </IconButton>
      </div>

      <Post isPostOpen={isPostOpen} closePost={closePost}/>
      
      {/* Test connect to backend */}
      <form action="/api" method="post" className="form">
        <button type="submit">Connected?</button>
      </form>
    </div>
  );
};

export default App;