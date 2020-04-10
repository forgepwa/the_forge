import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Toobar from "./index.js";

storiesOf("atoms/Toobar", module)
  .add("default", () => <Toobar onClick={action("clicked")}>Default</Toobar>)
  .add("outlined primary", () => (
    <Toobar variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </Toobar>
  ))
  .add("contained secondary", () => (
    <Toobar variant="contained" color="secondary" onClick={action("clicked")}>
      Contained Secondary
    </Toobar>
  ))
  .add("circle Toobar", () => (
    <Toobar
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </Toobar>
  ))
  .add("disabled Toobar", () => (
    <Toobar
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled Toobar
    </Toobar>
  ));
