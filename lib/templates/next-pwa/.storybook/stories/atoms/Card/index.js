import React from "react";
import PropTypes from "prop-types";
import { Card as MaterialCard } from "@material-ui/core";

const Card = (props) => {
  const { children, ...defaultProps } = props;
  return <MaterialCard {...defaultProps}>{children}</MaterialCard>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
