import { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import "./HomePage.scss";
import Content from "../../components/content/Content";
import Post from "../../components/Post/Post";

const HomePage = (props) => {
  
  const [isPostOpen, setPostOpen] = useState(false);

  const closePost = () => {
    setPostOpen(false);
  };

  const scollTop = () => {window.scrollTo(0, 0)}

  return (
    <div className="homepage">
      {/* Phần header đã chuyển sang bên App.js để hiển thị cho tất cả các trang */}
      {/* Main Content */}
      <Content pins={props.pins} />
      <div className="post-btn">
        <IconButton onClick={() => setPostOpen(!isPostOpen)}>
          <AddIcon fontSize="large" style={{ color: "black" }}/>
        </IconButton>
      </div>

      <div className="scroll-top-btn">
        <IconButton onClick={() => scollTop()}>
          <ArrowUpwardIcon fontSize="large" style={{ color: "black" }}/>
        </IconButton>
      </div>

      <Post isPostOpen={isPostOpen} closePost={closePost}/>
      {/* Test connect to backend */}
    </div>
  );
};

export default HomePage;