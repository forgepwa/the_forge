import React from "react";
import PropTypes from "prop-types";
import { ListItem as MaterialListItem } from "@material-ui/core";

const ListItem = (props) => {
  const { children, ...defaultProps } = props;
  return <MaterialListItem {...defaultProps}>{children}</MaterialListItem>;
};

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListItem;
