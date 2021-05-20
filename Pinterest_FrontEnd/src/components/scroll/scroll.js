import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { IconButton } from "@material-ui/core";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => toggleVisibility;
  }, []);

  return (
    <div className="scroll-top-btn">
      {isVisible && (
        <IconButton onClick={scrollToTop}>
          <ArrowUpwardIcon fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};
export { ScrollToTop };
