import React from "react";
import PropTypes from "prop-types";
import { ListItemIcon as MaterialListItemIcon } from "@material-ui/core";

const ListItemIcon = (props) => {
  const { children, ...defaultProps } = props;
  return (
    <MaterialListItemIcon {...defaultProps}>{children}</MaterialListItemIcon>
  );
};

ListItemIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListItemIcon;
