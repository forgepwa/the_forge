import React from "react";
import PropTypes from "prop-types";
import { AppBar as MaterialAppBar } from "@material-ui/core";

const AppBar = (props) => {
  const { children, ...defaultProps } = props;
  return <MaterialAppBar {...defaultProps}>{children}</MaterialAppBar>;
};

AppBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppBar;
