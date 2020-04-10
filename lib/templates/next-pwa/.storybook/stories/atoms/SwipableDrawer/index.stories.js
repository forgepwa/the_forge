import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import SwipableDrawer from "./index.js";

storiesOf("atoms/SwipableDrawer", module)
  .add("default", () => (
    <SwipableDrawer onClick={action("clicked")}>Default</SwipableDrawer>
  ))
  .add("outlined primary", () => (
    <SwipableDrawer
      variant="outlined"
      color="primary"
      onClick={action("clicked")}
    >
      Outline Primary
    </SwipableDrawer>
  ))
  .add("contained secondary", () => (
    <SwipableDrawer
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </SwipableDrawer>
  ))
  .add("circle SwipableDrawer", () => (
    <SwipableDrawer
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </SwipableDrawer>
  ))
  .add("disabled SwipableDrawer", () => (
    <SwipableDrawer
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled SwipableDrawer
    </SwipableDrawer>
  ));
