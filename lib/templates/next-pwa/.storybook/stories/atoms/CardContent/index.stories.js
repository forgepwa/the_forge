import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import CardContent from "./index.js";

storiesOf("atoms/CardContent", module)
  .add("default", () => (
    <CardContent onClick={action("clicked")}>Default</CardContent>
  ))
  .add("outlined primary", () => (
    <CardContent variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </CardContent>
  ))
  .add("contained secondary", () => (
    <CardContent
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </CardContent>
  ))
  .add("circle CardContent", () => (
    <CardContent
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </CardContent>
  ))
  .add("disabled CardContent", () => (
    <CardContent
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled CardContent
    </CardContent>
  ));
