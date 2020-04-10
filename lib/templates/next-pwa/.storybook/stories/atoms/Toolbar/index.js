import React from "react";
import PropTypes from "prop-types";
import { Toolbar as MaterialToolbar } from "@material-ui/core";

const Toolbar = (props) => {
  const { children, ...defaultProps } = props;
  return <MaterialToolbar {...defaultProps}>{children}</MaterialToolbar>;
};

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Toolbar;
