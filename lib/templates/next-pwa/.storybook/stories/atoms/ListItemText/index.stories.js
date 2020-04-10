import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import ListItemText from "./index.js";

storiesOf("atoms/ListItemText", module)
  .add("default", () => (
    <ListItemText onClick={action("clicked")}>Default</ListItemText>
  ))
  .add("outlined primary", () => (
    <ListItemText
      variant="outlined"
      color="primary"
      onClick={action("clicked")}
    >
      Outline Primary
    </ListItemText>
  ))
  .add("contained secondary", () => (
    <ListItemText
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </ListItemText>
  ))
  .add("circle ListItemText", () => (
    <ListItemText
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </ListItemText>
  ))
  .add("disabled ListItemText", () => (
    <ListItemText
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled ListItemText
    </ListItemText>
  ));
