import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/css/PageNotFound.css";

const NotFound = () => {
  <div className="error-template">
    <h1>Oops!</h1>
    <h2>404 Not Found</h2>
    <div className="error-details">
      Sorry, an error has occurred, Requested page not found!
    </div>
    <div className="error-actions">
      <Link className="btn btn-primary btn-lg" to="/">
        Take Me Home
      </Link>
      <Link className="btn btn-info btn-lg" to="/">
        Contact Support
      </Link>
    </div>
  </div>;
};

export { NotFound };
