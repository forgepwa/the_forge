import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import AppBar from "./index.js";

storiesOf("atoms/AppBar", module)
  .add("default", () => <AppBar onClick={action("clicked")}>Default</AppBar>)
  .add("outlined primary", () => (
    <AppBar variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </AppBar>
  ))
  .add("contained secondary", () => (
    <AppBar variant="contained" color="secondary" onClick={action("clicked")}>
      Contained Secondary
    </AppBar>
  ))
  .add("circle AppBar", () => (
    <AppBar
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </AppBar>
  ))
  .add("disabled AppBar", () => (
    <AppBar
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled AppBar
    </AppBar>
  ));
