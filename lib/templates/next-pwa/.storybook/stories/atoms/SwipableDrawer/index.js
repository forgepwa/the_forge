import React from "react";
import PropTypes from "prop-types";
import { SwipeableDrawer as MaterialSwipeableDrawer } from "@material-ui/core";

const SwipeableDrawer = (props) => {
  const { children, ...defaultProps } = props;
  return (
    <MaterialSwipeableDrawer {...defaultProps}>
      {children}
    </MaterialSwipeableDrawer>
  );
};

SwipeableDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SwipeableDrawer;
