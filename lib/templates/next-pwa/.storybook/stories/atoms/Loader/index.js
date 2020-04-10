import React from "react";
import PropTypes from "prop-types";
import { CircularProgress as MaterialCircularProgress } from "@material-ui/core";

const CircularProgress = (props) => {
  const { children, ...defaultProps } = props;
  return (
    <MaterialCircularProgress {...defaultProps}>
      {children}
    </MaterialCircularProgress>
  );
};

CircularProgress.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CircularProgress;
