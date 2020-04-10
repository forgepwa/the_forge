import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Typography from "./index.js";

storiesOf("atoms/Typography", module)
  .add("default", () => (
    <Typography onClick={action("clicked")}>Default</Typography>
  ))
  .add("outlined primary", () => (
    <Typography variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </Typography>
  ))
  .add("contained secondary", () => (
    <Typography
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </Typography>
  ))
  .add("circle Typography", () => (
    <Typography
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </Typography>
  ))
  .add("disabled Typography", () => (
    <Typography
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled Typography
    </Typography>
  ));
