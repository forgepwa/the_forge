import React from "react";
import PropTypes from "prop-types";
import { Typography as MaterialTypography } from "@material-ui/core";

const Typography = (props) => {
  const { children, ...defaultProps } = props;
  return <MaterialTypography {...defaultProps}>{children}</MaterialTypography>;
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Typography;
