import React ,{ useState, useEffect } from "react";

import styled from "styled-components";

import PinterestIcon from "@material-ui/icons/Pinterest";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TextsmsIcon from "@material-ui/icons/Textsms";
import FaceIcon from "@material-ui/icons/Face";
import KeyboardArrowIcon from "@material-ui/icons/KeyboardArrowDown";
import Poper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import { MenuItem } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

import { pinterestScreenRight } from '../../config/page';
import { authService } from '../../services/auth.service';
import { userService } from '../../services/user.service';

import { user } from '../../util/user';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import map from 'lodash/map';
import './Header.scss'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 12px 4px 4px 12px;
  background-color: white;
  color: black;
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color: #e60023;
    font-size: 32px;
    cursor: pointer;
    display: flex;
  }
`;

const Button = styled.div`
  display: flex;
  height: 48px;
  min-width: 123px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  cursor: pointer;
`;

const HomePageButton = styled(Button)`
  background-color: rgb(17, 17, 17);
  a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
`;

const FollowingButton = styled(Button)`
  background-color: white;
  a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
  :hover {
    background-color: #e1e1e1;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
`;

const SearchBarWrapper = styled.div`
  background-color: #efefef;
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: 50px;
  border: none;
  padding-left: 10px;

  form {
    display: flex;
    flex: 1;
  }

  form > input {
    background-color: transparent;
    border: none;
    width: 100%;
    margin-left: 5px;
    font-size: 16px;
  }

  form > button {
    display: none;
  }

  input:focus {
    outline: none;
  }
`;

const IconsWrapper = styled.div``;

const Header = ({ history }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const anchorRef = React.useRef(null); //useReflà một hàm trả về một đối tượng ref có thể thay đổi (Refs truy cập các nút DOM trong React)

  useEffect(async () => {
    //Lấy ảnh đại diện
    userService
      .getProfile()
      .then((res) => {
        setUserProfile(res);
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
    history.push('/login');
  }


  const handleClose = path => {
    toggleMenu();
    if(path!=='/signout') {
      history.push(path);
    }
    else
      handleLogout();
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <PinterestIcon />
      </LogoWrapper>
      <HomePageButton>
        <a href="/">Homepage</a>
      </HomePageButton>
      <FollowingButton>
        <a href="/">Following</a>
      </FollowingButton>
      <SearchWrapper>
        <SearchBarWrapper>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <form>
            <input type="text" />
            <button type="submit"></button>
          </form>
        </SearchBarWrapper>
      </SearchWrapper>
      <IconsWrapper>
        <IconButton >
          <NotificationsIcon/>
        </IconButton>
        <IconButton>
          <TextsmsIcon/>
        </IconButton>
        <IconButton 
          onClick={() => history.push('/profile')}
          >
          {!userProfile ? <FaceIcon/> : <Avatar style={{height: 30, width: 30}}  src={userProfile.profilePhoto}></Avatar>}
        </IconButton>
        <IconButton onClick = {toggleMenu}>
          <div ref={anchorRef} onClick={toggleMenu}>
            <KeyboardArrowIcon className="header-user-profile" />
          </div>
        </IconButton>
      </IconsWrapper>
      <Poper
        open = {isMenuOpen}
        transition
        anchorEl = {anchorRef.current}
        disablePortal
        className=""
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={clickAnyway}>
                <MenuList>
                  {map(pinterestScreenRight, nav => {
                    return (
                        <MenuItem
                        key={nav.path}
                        onClick = {() => handleClose(nav.path)}
                        >
                          {nav.name}
                        </MenuItem>
                    )
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

export default Header;