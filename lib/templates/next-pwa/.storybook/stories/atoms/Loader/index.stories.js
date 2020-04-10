import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import CircularProgress from "./index.js";

storiesOf("atoms/CircularProgress", module)
  .add("default", () => (
    <CircularProgress onClick={action("clicked")}>Default</CircularProgress>
  ))
  .add("outlined primary", () => (
    <CircularProgress
      variant="outlined"
      color="primary"
      onClick={action("clicked")}
    >
      Outline Primary
    </CircularProgress>
  ))
  .add("contained secondary", () => (
    <CircularProgress
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </CircularProgress>
  ))
  .add("circle CircularProgress", () => (
    <CircularProgress
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </CircularProgress>
  ))
  .add("disabled CircularProgress", () => (
    <CircularProgress
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled CircularProgress
    </CircularProgress>
  ));
