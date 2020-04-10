import React from "react";
import PropTypes from "prop-types";
import { CardContent as MaterialCardContent } from "@material-ui/core";

const CardContent = (props) => {
  const { children, ...defaultProps } = props;
  return (
    <MaterialCardContent {...defaultProps}>{children}</MaterialCardContent>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardContent;
