import React ,{ useState, useEffect } from "react";

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
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import { MenuItem } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

import { pinterestScreenRight } from '../../config/page';
import { authService } from '../../services/auth.service';
import { userService } from '../../services/user.service';
import { Link } from "react-router-dom";

import { user } from '../../util/user';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import map from 'lodash/map';
import './Header.scss';
import { resultFromApi, getNewPins } from "../../api/api";
import { apiPins } from '../../redux';
import { getCurrentUser } from '../../redux';

import { connect, useDispatch } from 'react-redux';

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const anchorRef = React.useRef(null); //useReflà một hàm trả về một đối tượng ref có thể thay đổi (Refs truy cập các nút DOM trong React)
  // const [pins, setNewPins] = useState([]);
  let pins = [];
  const [input, setInput] = useState('');
  const dispatch = useDispatch()

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    // await getImages(input).then((res) => {
    //   let results = res.data.results;
    //   let newPins = [...results];
    //   newPins.sort(() => {
    //     return 0.5 - Math.random();
    //   });
    //   pins = newPins;
    // });
    // console.log("Pins search: ", pins);
    // dispatch(apiPins(pins));
    // return props.history.push("/home");

    await resultFromApi(input).then((res) => {
      let results = res.map((img) => {
        return { urls: img.urls,
          downloads: img.downloads,
          likes: img.likes,
          tags: img.tags,
          user: img.user,
          views: img.views, };
      });

      let newPins = [];
      newPins = [...results];
      newPins.sort(() => {
        return 0.5 - Math.random();
      });

      pins = newPins;
      setInput();

      console.log("Pins từ search; ", pins);
      dispatch(apiPins(pins));
      return props.history.push("/home");
    });
  };

  useEffect(async () => {
    getNewPins().then((value) => {
      // console.log("Pins lúc này: ", pins);
      dispatch(apiPins(value));
    });
    
    //Lấy ảnh đại diện
    userService
      .getProfile()
      .then((res) => {
        setUserProfile(res);
        dispatch(getCurrentUser(res));
      })
      .catch((err) => {
      
      });

  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const clickAnyway = () => {
    setIsMenuOpen(false);
  }

  const handleLogout = () => {
    authService.logout();
    props.history.push('/login');
  }


  const handleClose = path => {
    toggleMenu();
    if(path!=='/signout') {
      props.history.push(path);
    }
    else
      handleLogout();
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Link to="/home">
          <PinterestIcon className="pinterest-icon" />
        </Link>
      </LogoWrapper>
      <HomePageButton>
        <Link to="/home">Homepage</Link>
      </HomePageButton>

      <SearchWrapper>
        <SearchBarWrapper>
          <IconButton onClick={onSearchSubmit}>
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
            />
          )}
        </IconButton>
        <IconButton onClick={toggleMenu}>
          <div ref={anchorRef}>
            <KeyboardArrowIcon className="header-user-profile" />
          </div>
        </IconButton>
      </IconsWrapper>
      <Popper
        open={isMenuOpen}
        transition
        anchorEl={anchorRef.current}
        disablePortal
        className="popper"
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
      </Popper>
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
// const mapStateToProps = state => {
//   return {
//     pins: state.pins
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     apiPins: (pins) => dispatch(apiPins(pins))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;