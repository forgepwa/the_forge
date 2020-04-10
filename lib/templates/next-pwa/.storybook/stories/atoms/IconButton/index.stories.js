import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import IconButton from "./index.js";

storiesOf("atoms/IconButton", module)
  .add("default", () => (
    <IconButton onClick={action("clicked")}>Default</IconButton>
  ))
  .add("outlined primary", () => (
    <IconButton variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </IconButton>
  ))
  .add("contained secondary", () => (
    <IconButton
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </IconButton>
  ))
  .add("circle IconButton", () => (
    <IconButton
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </IconButton>
  ))
  .add("disabled IconButton", () => (
    <IconButton
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled IconButton
    </IconButton>
  ));
