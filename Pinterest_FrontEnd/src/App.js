import { Switch, Route, Redirect } from "react-router";
import Header from "./components/Header";
import Content from "./components/content/Content";
import unsplash from "./api/unsplash";
import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [pins, setNewPins] = useState([]);

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

  return (
    <div className="app">
      {/* Header */}
      <Header onSubmit={onSearchSubmit} />
      {/* Main Content */}
      <Content pins={pins} />
      {/* Test connect to backend */}
      <form action="/api" method="post" className="form">
        <button type="submit">Connected?</button>
      </form>
    </div>
  );
};

export default App;
