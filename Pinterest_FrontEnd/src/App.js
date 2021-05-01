import React from "react";
import map from "lodash/map"; // Tạo ra một mảng các giá trị bằng cách for các phần tử
import isEmpty from "lodash/isEmpty"; //Kiểm tra gtri truyền vào có trống ko (boolean)
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types"; //Kiếm tra Runtime cho React-prop hoặc object tương tự
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./redux/store";

import { pagesHasPermission } from "./config/page";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { PublicRoute } from "./components/public-route/PublicRoute";
import { user } from "./util/user"; //Liên quan đến token của user trên localStorage
import { NotFound } from "./components/not-found/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import { Verify } from "./pages/Register/Verify/Verify"; //Trang xác nhận sau khi Register
import { Profile } from "./pages/Profile/Profile";
import Header from "./components/Header/Header";
import { Detail } from "./pages/Detail/Detail";
import {
  colorPrimary,
  colorSecondary,
  colorPrimaryTypo,
  colorSecondaryTypo,
} from "./styles/style-common";

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

const components = {
  HomePage,
  Verify,
  Profile,
  Detail,
};

const App = ({ history, ...rest }) => {
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
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="root-content full-height">
          {!isVerifyPage && <Header history={history} {...rest} />}
          <Switch>
            <Route exact path="/" render={() => redirectHomePage()} />
            {map(pagesHasPermission, (page) => {
              return (
                <PrivateRoute
                  key={page.component}
                  path={page.path}
                  component={components[page.component]}
                  exact
                />
              );
            })}

            <PublicRoute path="*" component={NotFound} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};

App.defaultProps = {
  history: {},
};

export default App;
