import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import List from "./index.js";

storiesOf("atoms/List", module)
  .add("default", () => <List onClick={action("clicked")}>Default</List>)
  .add("outlined primary", () => (
    <List variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </List>
  ))
  .add("contained secondary", () => (
    <List variant="contained" color="secondary" onClick={action("clicked")}>
      Contained Secondary
    </List>
  ))
  .add("circle List", () => (
    <List
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </List>
  ))
  .add("disabled List", () => (
    <List
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled List
    </List>
  ));
