import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import ListItemIcon from "./index.js";

storiesOf("atoms/ListItemIcon", module)
  .add("default", () => (
    <ListItemIcon onClick={action("clicked")}>Default</ListItemIcon>
  ))
  .add("outlined primary", () => (
    <ListItemIcon
      variant="outlined"
      color="primary"
      onClick={action("clicked")}
    >
      Outline Primary
    </ListItemIcon>
  ))
  .add("contained secondary", () => (
    <ListItemIcon
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </ListItemIcon>
  ))
  .add("circle ListItemIcon", () => (
    <ListItemIcon
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </ListItemIcon>
  ))
  .add("disabled ListItemIcon", () => (
    <ListItemIcon
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled ListItemIcon
    </ListItemIcon>
  ));
