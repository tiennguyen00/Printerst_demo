import React from "react";
import map from "lodash/map"; // Tạo ra một mảng các giá trị bằng cách for các phần tử
import isEmpty from "lodash/isEmpty"; //Kiểm tra gtri truyền vào có trống ko (boolean)
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types"; //Kiếm tra Runtime cho React-prop hoặc object tương tự
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

<<<<<<< HEAD
import { user } from './util/user'; //Liên quan đến token của user trên localStorage
import { NotFound } from './components/not-found/not-found';
import HomePage from './pages/HomePage/HomePage';
import { Verify } from './pages/Register/Verify/Verify'; //Trang xác nhận sau khi Registernp
import { colorPrimary, colorSecondary, colorPrimaryTypo, colorSecondaryTypo } from './styles/style-common';
=======
import { pagesHasPermission, pagesNotHasPermission } from "./config/page";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { PublicRoute } from "./components/public-route/PublicRoute";
import { user } from "./util/user"; //Liên quan đến token của user trên localStorage
import { NotFound } from "./components/not-found/not-found";
import HomePage from "./pages/HomePage/HomePage";
import { Verify } from "./pages/Register/Verify/Verify"; //Trang xác nhận sau khi Register
import { Profile } from './pages/Profile/Profile';
import Header from './components/Header/Header';
import {
  colorPrimary,
  colorSecondary,
  colorPrimaryTypo,
  colorSecondaryTypo,
} from "./styles/style-common";
>>>>>>> b935cc25f7d2528d37b10017ce3f5c883d959419

const theme = createMuiTheme({
  palette: {
    primary: { main: colorPrimary },
    secondary: { main: colorSecondary },
  },
  text: {
    primary: colorPrimaryTypo,
    secondary: colorSecondaryTypo,
  },
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});


function App({ history, ...rest }) {
  const [isVerifyPage, setIsVerifyPage] = React.useState(false);

  React.useEffect(() => {
    const isVerify = window.location.pathname === "/verify";
    setIsVerifyPage(isVerify);
  }, [window.location.pathname]);

  //Kiểm tra xem user có đăng nhập trước đó hay không
  const redirectHomePage = () => {
    const userInfo = user.getUserInfo();

    if (isEmpty(userInfo)) {
      return <Redirect to="/login" />;
    }
    return <Redirect to="/home" />;
  };

  return (
<<<<<<< HEAD
    <HomePage />
    // <MuiThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <div>
    //     <h1>hi</h1>
    //     <Switch>
    //       <Route exact path='/' render={() => redirectHomePage()}/>
    //       <HomePage/>
    //     </Switch>
    //   </div>
    // </MuiThemeProvider>
  )
};
=======
      <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="root-content full-height">
        {!isVerifyPage && <Header history={history} {...rest} />}
        <Switch>
            <Route exact path='/' render={() => redirectHomePage()} />
            <PrivateRoute exact path="/" render={() => redirectHomePage()} />
            <PrivateRoute exact path="/verify" component={Verify} key="Verify" />
            <PrivateRoute exact path="/home" component={HomePage} key="HomePage" />
            <PrivateRoute exact path="/profile" component={Profile} key="Profile" />

            <PublicRoute path='*' component={NotFound} />
          </Switch>
      </div>
    </MuiThemeProvider>
  );
}
>>>>>>> b935cc25f7d2528d37b10017ce3f5c883d959419

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};

App.defaultProps = {
  history: {},
};

export default App;
