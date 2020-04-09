import React from "react";
import PropTypes from "prop-types";
import { Button as MaterialButton } from "@material-ui/core";

const Button = (props) => {
  const { children, ...defaultProps } = props;
  return <MaterialButton {...defaultProps}>{children}</MaterialButton>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
