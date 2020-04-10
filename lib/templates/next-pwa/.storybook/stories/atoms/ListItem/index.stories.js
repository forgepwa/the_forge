import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import ListItem from "./index.js";

storiesOf("atoms/ListItem", module)
  .add("default", () => (
    <ListItem onClick={action("clicked")}>Default</ListItem>
  ))
  .add("outlined primary", () => (
    <ListItem variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </ListItem>
  ))
  .add("contained secondary", () => (
    <ListItem variant="contained" color="secondary" onClick={action("clicked")}>
      Contained Secondary
    </ListItem>
  ))
  .add("circle ListItem", () => (
    <ListItem
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </ListItem>
  ))
  .add("disabled ListItem", () => (
    <ListItem
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled ListItem
    </ListItem>
  ));
