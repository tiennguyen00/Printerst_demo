import React from "react";
import Pin from "../../components/Pin/Pin";

function Detail(props) {
  return (
    <div>
      <Pin urls={props.urls} />
    </div>
  );
}

export { Detail };
