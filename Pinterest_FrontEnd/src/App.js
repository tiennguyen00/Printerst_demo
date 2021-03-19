import React from 'react';
import map from 'lodash/map';  // Tạo ra một mảng các giá trị bằng cách for các phần tử
import isEmpty from 'lodash/isEmpty'; //Kiểm tra gtri truyền vào có trống ko (boolean)
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'; //Kiếm tra Runtime cho React-prop hoặc object tương tự
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { user } from './util/user'; //Liên quan đến token của user trên localStorage
import { NotFound } from './components/not-found/not-found';
import HomePage from './pages/HomePage/HomePage';
import { Verify } from './pages/Register/Verify/Verify'; //Trang xác nhận sau khi Register
import { colorPrimary, colorSecondary, colorPrimaryTypo, colorSecondaryTypo } from './styles/style-common';

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
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>hi</h1>
        <Switch>
          <Route exact path='/' render={() => redirectHomePage()}/>
        </Switch>
      </div>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};

App.defaultProps = {
  history: {},
};

export default App;