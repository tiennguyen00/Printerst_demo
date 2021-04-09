import { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import "./HomePage.scss";
import Content from "../../components/content/Content";
import Post from "../../components/Post/Post";

const HomePage = (props) => {
  
  const [isPostOpen, setPostOpen] = useState(false);

  const closePost = () => {
    setPostOpen(false);
  };

  return (
    <div className="homepage">
      {/* Phần header đã chuyển sang bên App.js để hiển thị cho tất cả các trang */}
      {/* Main Content */}
      <Content pins={props.pins} />
      <div className="post-btn">
        <IconButton onClick={() => setPostOpen(!isPostOpen)}>
          <AddCircleOutlineIcon style={{ color: "#BE1E2D", fontSize: 80 }} />
        </IconButton>
      </div>

      <Post isPostOpen={isPostOpen} closePost={closePost} />
      {/* Test connect to backend */}
    </div>
  );
};

export default HomePage;