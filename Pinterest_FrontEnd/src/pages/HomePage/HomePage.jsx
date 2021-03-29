import { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import "./HomePage.scss";

import Header from "../../components/Header/Header";
import Content from "../../components/content/Content";
import Post from "../../components/Post/Post";
import unsplash from "../../api/unsplash";

const HomePage = () => {
  const [pins, setNewPins] = useState([]);
  const [isPostOpen, setPostOpen] = useState(false);

  const getImages = (term) => {
    return unsplash.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
    });
  };

  const onSearchSubmit = (term) => {
    console.log(term);
    getImages(term).then((res) => {
      let results = res.data.results;

      let newPins = [...results, ...pins];

      newPins.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      setNewPins(newPins);
      console.log(results);
    });
  };

  const getNewPins = () => {
    let promises = [];
    let pinData = [];
    let pins = ["text", "dog"];
    pins.forEach((pinTerm) => {
      promises.push(
        getImages(pinTerm).then((res) => {
          let results = res.data.results;
          pinData = pinData.concat(results);
          pinData.sort(function (a, b) {
            return 0.5 - Math.random();
          });
        })
      );
    });
    Promise.all(promises).then(() => {
      setNewPins(pinData);
    });
  };

  useEffect(() => {
    getNewPins();
  }, []);

  const closePost = () => {
    setPostOpen(false);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <Header onSubmit={onSearchSubmit} />
      {/* Main Content */}
      <Content pins={pins} />
      <div className="post-btn">
        <IconButton onClick={() => setPostOpen(!isPostOpen)}>
          <AddCircleIcon style={{ color: "red", fontSize: 50 }} />
        </IconButton>
      </div>

      <Post isPostOpen={isPostOpen} closePost={closePost} />
      {/* Test connect to backend */}
    </div>
  );
};

export default HomePage;
