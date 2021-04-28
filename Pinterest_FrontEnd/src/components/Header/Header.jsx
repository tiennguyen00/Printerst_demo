import React, { useState, useEffect } from "react";

import {
  IconsWrapper,
  SearchWrapper,
  HomePageButton,
  LogoWrapper,
  Wrapper,
  SearchBarWrapper,
} from "./styled-components";

import PinterestIcon from "@material-ui/icons/Pinterest";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TextsmsIcon from "@material-ui/icons/Textsms";
import FaceIcon from "@material-ui/icons/Face";
import KeyboardArrowIcon from "@material-ui/icons/KeyboardArrowDown";
import Poper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import { MenuItem } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

import { pinterestScreenRight } from "../../config/page";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";

import PropTypes from "prop-types";

import map from "lodash/map";
import "./Header.scss";
import { unsplash, pixabay } from "../../api/api";
import { apiPins } from "../../redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const anchorRef = React.useRef(null); //useRef trả về một đối tượng ref có thể thay đổi (Refs truy cập virtual DOM của React)
  let pins = [];
  const [input, setInput] = useState("");

  const getImgFromUnsplash = async (term) =>
    unsplash.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
    });

  const getNewPins = async () => {
    let pinDatav1 = [];
    let pinDatav2 = [];
    let defaultImgPixabay = ["piano", "code", "plane"];

    try {
      for (let term in defaultImgPixabay) {
        const getImg = await unsplash.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query: term },
          }
        );

        const dataPinV1 = getImg.data.results.map((img) => {
          return { urls: img.urls.full };
        });
        pinDatav1 = [...pinDatav1, ...dataPinV1];

        const getImgV2 = await pixabay.get(`https://pixabay.com/api/`, {
          params: {
            key: "21224893-c61153f1d9b5a52314e204800",
            q: term,
            per_page: 20,
          },
        });

        const pinDataV2 = getImgV2.data.hits.map((img) => {
          return { urls: img.webformatURL };
        });
        pinDatav2 = [...pinDatav2, ...pinDataV2];
      }
    } catch (err) {
      console.log(err.message);
    }

    return [...pinDatav1, ...pinDatav2];
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();

    await getImgFromUnsplash(input).then((res) => {
      let results = res.data.results;
      let newPins = [...results];
      newPins.sort(() => {
        return 0.5 - Math.random();
      });
      pins = newPins;
    });

    props.apiPins(pins);
    return props.history.push("/home");
  };

  useEffect(() => {
    async function getAvatar() {
      try {
        userService
          .getProfile()
          .then((res) => {
            setUserProfile(res);
          })
          .catch((error) => {
            console.log(error.message);
          });
      } catch (err) {
        console.log(err.message);
      }
    }
    getAvatar();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    getNewPins().then((value) => {
      dispatch(apiPins(value));
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const clickAnyway = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    props.history.push("/login");
  };

  const handleClose = (path) => {
    toggleMenu();
    if (path !== "/signout") {
      props.history.push(path);
    } else handleLogout();
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <PinterestIcon />
      </LogoWrapper>
      <HomePageButton>
        <a href="/">Homepage</a>
      </HomePageButton>

      <SearchWrapper>
        <SearchBarWrapper>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <form>
            <input type="text" onChange={(e) => setInput(e.target.value)} />
            <button type="submit" onClick={onSearchSubmit} />
          </form>
        </SearchBarWrapper>
      </SearchWrapper>
      <IconsWrapper>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <TextsmsIcon />
        </IconButton>
        <IconButton onClick={(e) => props.history.push("/profile")}>
          {!userProfile ? (
            <FaceIcon />
          ) : (
            <Avatar
              style={{ height: 30, width: 30 }}
              src={userProfile.profilePhoto}
            ></Avatar>
          )}
        </IconButton>
        <IconButton onClick={toggleMenu}>
          <div ref={anchorRef}>
            <KeyboardArrowIcon className="header-user-profile" />
          </div>
        </IconButton>
      </IconsWrapper>
      <Poper
        open={isMenuOpen}
        transition
        anchorEl={anchorRef.current}
        disablePortal
        className="poper"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={clickAnyway}>
                <MenuList>
                  {map(pinterestScreenRight, (nav) => {
                    return (
                      <MenuItem
                        key={nav.path}
                        onClick={() => handleClose(nav.path)}
                      >
                        {nav.name}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poper>
    </Wrapper>
  );
};

Header.propTypes = {
  history: PropTypes.instanceOf(Object),
};

Header.defaultProps = {
  history: {},
};

//Phan cua redux
const mapStateToProps = (state) => {
  return {
    pins: state.pins,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    apiPins: (pins) => dispatch(apiPins(pins)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
