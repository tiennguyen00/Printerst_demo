import React from "react";
import ButtonMaterial from "@material-ui/core/Button";
import PropTypes from "prop-types";
import "../../assets/styles/css/Button.css";

function Button({ text, variant, classes, ...otherProps }) {
  return (
    <ButtonMaterial variant={variant} className={classes} {...otherProps}>
      {text}
    </ButtonMaterial>
  );
}

Button.defaultProps = {
  text: "",
  variant: "contained",
  classes: "",
};

export { Button };
