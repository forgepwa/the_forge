import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import CardAction from "./index.js";

storiesOf("atoms/CardAction", module)
  .add("default", () => (
    <CardAction onClick={action("clicked")}>Default</CardAction>
  ))
  .add("outlined primary", () => (
    <CardAction variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </CardAction>
  ))
  .add("contained secondary", () => (
    <CardAction
      variant="contained"
      color="secondary"
      onClick={action("clicked")}
    >
      Contained Secondary
    </CardAction>
  ))
  .add("circle CardAction", () => (
    <CardAction
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </CardAction>
  ))
  .add("disabled CardAction", () => (
    <CardAction
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled CardAction
    </CardAction>
  ));
