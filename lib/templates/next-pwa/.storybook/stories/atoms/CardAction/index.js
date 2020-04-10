import React from "react";
import PropTypes from "prop-types";
import { CardActions as MaterialCardAction } from "@material-ui/core";

const CardAction = (props) => {
  const { children, ...defaultProps } = props;
  return <MaterialCardAction {...defaultProps}>{children}</MaterialCardAction>;
};

CardAction.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardAction;
